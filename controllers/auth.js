const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  // check user by email
  const candidate = await User.findOne({ email: email });
  if (candidate) {
    // check user's password
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if (passwordResult) {
      // if success - send token to user
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res.status(401).json({ message: 'Something was wrong. Try again.' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports.register = async function (req, res) {
  // email , password
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    return res
      .status(409)
      .json({ message: 'This email was used.Try an another one' });
  } else {
    // will create secured password
    // bcrypt
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    // save to Dbase
    try {
      await user.save();

      // response with status "created successfully"
      res.status(201).json({ message: 'User was created' });
    } catch (error) {
      // through error in handlers
      errorHandler(res, error);
    }
  }
  const user = new User({
    email: req.body.email,
    password: req.body.email,
  });

  user.save().then(() => console.log('created user'));
};
