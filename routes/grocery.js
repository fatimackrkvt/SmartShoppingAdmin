const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const Grocery = require('../models/Grocery');

const router = express.Router();

// @route  GET api/grocery
// @desc   Get grocery list
// @access Private
router.get('/',  auth, async (req,res) => {
    try {
        let groceryList = await Grocery.find( {} );
        res.json(groceryList);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }    
});

// @route  POST  api/grocery
// @desc   Add grocery
// @access private
router.post('/Add', auth, [ check('name','Please enter a name').exists()], 
                 async(req,res) => {

                    const error = validationResult(req);
                    if(!error.isEmpty()){
                        return res.status(400).json({errors: error.array()})
                    }
                
                    const {name} = req.body;
                    try {
                        let groceryCheck = await Grocery.findOne({name});
                        if(groceryCheck){
                            return res.status(422).json({msg:'Already Exists'})
                        }

                        let newGrocery = new Grocery({name});
                        await newGrocery.save();

                        const payload = {  newGrocery };
                        res.json(payload);
                        
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send('Server error');        
                    }
});

// @route  POST  api/grocery
// @desc   Update grocery
// @access private
router.post('/Update', auth,  [ check('name','Please enter a name').exists()], 
                 async(req,res) => {

                    const error = validationResult(req);
                    if(!error.isEmpty()){
                        return res.status(400).json({errors: error.array()})
                    }
                
                    const {_id, name} = req.body;
                    try {
                        let groceryCheck = await Grocery.findById({_id});
                        if(!groceryCheck){
                            return res.status(422).json({msg:'Not exists to update'})
                        } /*not change not update */

                        await Grocery.update({_id},{ $set: {name}  } );

                        res.status(200).send();
                        
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send('Server error');        
                    }
});

// @route  POST  api/grocery
// @desc   Delete frocery
// @access private
router.post('/Delete', auth, [ check('id','Please enter a valid id').exists()], 
                 async(req,res) => {

                    const error = validationResult(req);
                    if(!error.isEmpty()){
                        return res.status(400).json({errors: error.array()})
                    }
                
                    const {id} = req.body;
                    try {
                        let groceryCheck = await Grocery.findById(id);
                        if(!groceryCheck){
                            return res.status(422).json({msg:'Not exists to Delete'})
                        }

                        await Grocery.deleteOne({ _id:id});

                        res.status(200).send();
                        
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send('Server error');        
                    }
});

module.exports = router;
