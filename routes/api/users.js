const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');

// Get the user Model
const User = require('../../models/Users');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a valid password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      // findOne finds the user based on the key we have passed to it
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exits' }] });
      }

      // Get the user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt the pwd using Bcryptjs
      // what is a salt?
      const salt = await bcrypt.genSalt(10);

      // Encrypt the pwd
      user.password = await bcrypt.hash(password, salt);
      // save user into the db
      await user.save();

      // return the JWT
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000 },
            ( err, token ) => {
                if(err) throw err;
                res.json({ token });
            })
        //Return jsonwebtoken
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
