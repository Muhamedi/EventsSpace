const User = require('../models/User');
const CONSTANTS = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpStatusCodes } = require('../enums/enums.js');

exports.createNewUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(HttpStatusCodes.CONFLICT).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }
    if (password !== confirmPassword) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Password and confirm password should be equal',
      });
    }
    bcrypt.hash(
      password,
      CONSTANTS.SALT_ROUNDS,
      async (error, hashedPassword) => {
        if (error) {
          return res
            .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: 'Error creating the user.' });
        }
        const user = new User({
          email,
          password: hashedPassword,
        });
        const result = await user.save();
        if (result) {
          return res
            .status(HttpStatusCodes.CREATED)
            .json({ success: true, message: 'User created successfully.' });
        }
      }
    );
  } catch (ex) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Error creating the user.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log('User:', user);
    if (!user) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ success: false, message: 'Username or password incorrect!' });
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return res
          .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: 'An error occurred.' });
      }
      if (!result) {
        return res
          .status(HttpStatusCodes.UNAUTHORIZED)
          .json({ success: false, message: 'Username or password incorrect!' });
      }
      let token = jwt.sign(
        { id: user._id, email: user.email },
        CONSTANTS.EXPRESS_JWT_SECRET,
        { expiresIn: 129600 }
      );
      return res.status(HttpStatusCodes.SUCCESS).json({ success: true, token });
    });
  } catch {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Log in failed.' });
  }
};
