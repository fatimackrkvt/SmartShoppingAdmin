const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const ProductGroup = require('../models/ProductGroup');

const router = express.Router();

// @route  GET api/productGroup
// @desc   Get Product Groups
// @access Private
router.get('/',  auth, async (req,res) => {
    try {
        let productGroupList = await ProductGroup.find( {} );
        res.json(productGroupList);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }    
});

// @route  POST  api/productGroup
// @desc   Add product group
// @access private
router.post('/Add', auth, 
                      [ check('name','Please enter a name').exists(),
                        check('name','Please enter a Base Product Id').exists()], 
                 async(req,res) => {

                    const error = validationResult(req);
                    if(!error.isEmpty()){
                        return res.status(400).json({errors: error.array()})
                    }
                
                    const {name, baseProductGroupId} = req.body;
                    let newProductGroup = new ProductGroup({name,baseProductGroupId});
                    try {
                        let productGroupCheck = await ProductGroup.findOne({name});
                        if(productGroupCheck){
                            return res.status(401).json({msg:'Invalid credentials'})
                        }

                        await newProductGroup.save();

                        const payload = {  newProductGroup };
                        res.json(payload);
                        
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send('Server error');        
                    }
});

// @route  POST  api/productGroup
// @desc   Update product group
// @access private
router.post('/Update', auth, 
                      [ check('name','Please enter a name').exists(),
                        check('name','Please enter a Base Product Id').exists()], 
                 async(req,res) => {

                    const error = validationResult(req);
                    if(!error.isEmpty()){
                        return res.status(400).json({errors: error.array()})
                    }
                
                    const {_id, name, baseProductGroupId} = req.body;

                    try {
                        let productGroupCheck = await ProductGroup.findById({_id});
                        if(!productGroupCheck){
                            return res.status(401).json({msg:'No Object'})
                        } /*not change not update */
                        await ProductGroup.update({_id},{
                            $set: {
                              name,
                              baseProductGroupId}
                            }
                        );

                        res.status(200).send();
                        
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send('Server error');        
                    }
});

// @route  POST  api/productGroup
// @desc   Delete product group
// @access private
router.post('/Delete', auth, 
                      [ check('id','Please enter a valid id').exists()], 
                 async(req,res) => {

                    const error = validationResult(req);
                    if(!error.isEmpty()){
                        return res.status(400).json({errors: error.array()})
                    }
                
                    const {id} = req.body;
                    try {
                        let productGroupCheck = await ProductGroup.findById(id);
                        if(!productGroupCheck){
                            return res.status(401).json({msg:'No Object'})
                        } /*not change not update */

                        var myQuery = { _id:id};
                        await ProductGroup.deleteOne(myQuery);

                        res.status(200).send();
                        
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send('Server error');        
                    }
});

module.exports = router;
