const User = require('../models/user.model');
const CONSTANTS = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/sendEmail.service');
const { readFile } = require('../helpers/readFile');
const { HttpStatusCodes } = require('../enums/enums');

exports.createNewUser = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(HttpStatusCodes.CONFLICT).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }
    bcrypt.hash(
      password,
      CONSTANTS.SALT_ROUNDS,
      async (error, hashedPassword) => {
        if (error) {
          throw new Error(error);
        }
        const user = new User({
          email,
          password: hashedPassword,
        });
        const result = await user.save();
        if (result) {
          const template = readFile('templates/accountcreated.html');
          const emailContent = {
            to: email,
            subject: 'Account created',
            template
          }
          sendEmail(emailContent);
          return res
            .status(HttpStatusCodes.CREATED)
            .json({ success: true, message: 'User created successfully.' });
        }
      }
    );
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
    if(!user.isActive) {
      return res
        .status(HttpStatusCodes.FORBIDDEN)
        .json({ success: false, message: 'Your account has not been activated.' });
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        throw new Error(error);
      }
      if (!result) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Username or password incorrect!' });
      }
      const tokenExpirationDate = new Date(
        new Date().getTime() + Number(CONSTANTS.TOKEN_EXPIRATION_TIME)
      );
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
    });
  } catch (err) {
    return next(new Error(err));
  }
};
