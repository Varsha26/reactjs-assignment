const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Users = require('../../models/Users');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } =
    require('express-validator/check');
const bcrypt = require('bcryptjs');

//@route  GET api/auth
//@desc   Test route
//@access Public
router.get('/',auth, async(req, res) => {
    try {
        const user = await Users.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');   
    }
});

//@route  Post api/auth
//@desc   Authenticate user & get token
//@access Public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        //See if user exists
        let user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch) {
            return res.status(400)
            .json({errors: [{msg: 'Invalid credentials'}]});
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000 },
            ( err, token ) => {
                if(err) throw err;
                res.json({ token });
            })
    } catch (err) {
        console.error(err.mesage);
        res.status(500).send('Server Error');

    }
});
module.exports = router;