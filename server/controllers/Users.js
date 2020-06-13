const User = require('../models/User');
const bcrypt = require('bcrypt');
const HttpStatusCodes = require('./enums/enums.js');

exports.createNewUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json('Password and confirm password should be equal');
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
      if (error) {
        return res
          .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: 'Error creating the user.' });
      }
      const user = new User({
        email,
        password: hashedPassword,
      });
      const result = await user.save();
      if (result) {
        return res
          .status(HttpStatusCodes.CREATED)
          .json({ message: 'User created successfully.' });
      }
    });
  } catch (ex) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error creating the user.' });
  }
};
