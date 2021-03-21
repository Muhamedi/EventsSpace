const User = require('../models/user.model');
const AccountActivation = require('../models/accountActivation.model');
const CONSTANTS = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const sendEmail = require('../services/sendEmail.service');
const { readFile } = require('../helpers/readFile');
const { HttpStatusCodes } = require('../enums/enums');

exports.createNewUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(HttpStatusCodes.CONFLICT).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    if (result) {
      const activationId = uuidv4();
      const userId = result._id;
      const accountActivation = new AccountActivation({
        userId,
        activationId,
        isValid: true,
        expiration: moment().add(1, 'hours').toDate(),
      });
      const accountResult = await accountActivation.save();
      if (accountResult) {
        const templateFile = readFile('templates/accountcreated.html');
        const template = templateFile.replace(
          /\[activationUrl\]/g,
          CONSTANTS.EVENTS_SPACE_CLIENT_BASE_URL.concat(
            `users/${userId}/activation?id=${activationId}&email=${email}`
          )
        );
        const emailContent = {
          to: email,
          subject: 'Account created',
          template,
        };
        sendEmail(emailContent);
      }
      return res
        .status(HttpStatusCodes.CREATED)
        .json({ success: true, message: 'User created successfully.' });
    }
  } catch (err) {
    return next(new Error(err));
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    const { id, email } = req.query;
    const { userId } = req.params;
    const user = await User.findOne({ email });
    const activation = await AccountActivation.findOne({
      userId,
      activationId: id,
      expiration: {
        $gt: moment().toDate(),
        $lt: moment().add(1, 'hours').toDate(),
      },
    });
    if (!activation) {
      return res
        .status(HttpStatusCodes.GONE)
        .json({ success: false, message: 'The link is invalid.' });
    }
    if (user.isActive) {
      return res
        .status(HttpStatusCodes.CONFLICT)
        .json({ success: false, message: 'User has been already activated' });
    }
    if (!user) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "This user doesn't exist." });
    }
    user.isActive = true;
    user.save();
    const templateFile = readFile('templates/accountactivated.html');
    const template = templateFile.replace(
      /\[loginUrl]/g,
      CONSTANTS.EVENTS_SPACE_CLIENT_BASE_URL.concat('login')
    );
    const emailContent = {
      to: email,
      subject: 'Account created',
      template,
    };
    sendEmail(emailContent);
    return res
      .status(HttpStatusCodes.OK)
      .json({ success: true, message: 'User has been activated.' });
  } catch (err) {
    return next(new Error(err));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Email or password incorrect!' });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ success: false, message: 'Username or password incorrect!' });
    }
    if (!user.isActive) {
      return res.status(HttpStatusCodes.FORBIDDEN).json({
        success: false,
        message: 'Your account has not been activated.',
      });
    }
    const tokenExpirationDate =
      new Date().getTime() + Number(CONSTANTS.TOKEN_EXPIRATION_TIME);
    let token = jwt.sign(
      { id: user._id, email: user.email },
      CONSTANTS.EXPRESS_JWT_SECRET,
      { expiresIn: tokenExpirationDate }
    );
    return res.status(HttpStatusCodes.OK).json({
      success: true,
      token,
      expiresIn: tokenExpirationDate,
    });
  } catch (err) {
    return next(new Error(err));
  }
};
