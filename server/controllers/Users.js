const User = require('../models/User');

exports.createNewUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if(password !== confirmPassword) {
    res.status(403).send('Password and confirm password should be equal');
  }
  const user = new User({
    email,
    password,
  });
  const result = await user.save();
  if (result) {
    return res.sendStatus(201);
  }
};