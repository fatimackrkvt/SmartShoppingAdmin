const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post('/Register', [ check('name','Name is required').not().isEmpty(),
                  check('email','Please enter a valid email').isEmail(),
                  check('password','Please enter a password, min 8 character')
                  .isLength({min:8})], 
                async (req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({msg:'User is already exist'})
        }

        user = new User({name,email,password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn:360000},
                  (err, token) => {
                      if(err) throw err;
                      console.log(token);
                      res.json({token})
                  });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');        
    }
}); 

// @route  GET api/users
// @desc   Get logged in user
// @access Private
router.get('/',  auth, async (req,res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }    
});

// @route  POST  api/users
// @desc   Auth user & Get Token
// @access Public
router.post('/Login', [ check('email','Please enter a valid email').isEmail(),
                        check('password','Please enter a password').exists() ], 
                 async(req,res) => {

                    const error = validationResult(req);
                    if(!error.isEmpty()){
                        return res.status(400).json({errors: error.array()})
                    }
                
                    const {email, password} = req.body;
                    try {
                        let user = await User.findOne({email});
                        if(!user){
                            return res.status(401).json({msg:'Invalid credentials'})
                        }

                        const isMatch = await bcrypt.compare(password, user.password);
                        if(!isMatch){
                            return res.status(401).json({msg:'Invalid credentials'})
                        }

                        const payload = {
                            user:{
                                id:user.id
                            }
                        }
                
                        jwt.sign(payload, config.get('jwtSecret'), {expiresIn:360000},
                                  (err, token) => {
                                      if(err) throw err;
                                      console.log(token);
                                      res.json({token})
                                  });
                        
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send('Server error');        
                    }
});

module.exports = router;
