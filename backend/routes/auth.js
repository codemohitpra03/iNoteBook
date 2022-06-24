const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Everythingisgoodwith$pm';


//Create a user using :POST "/api/auth/createuser". Doesnt require auth . No login Required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid name').isEmail(),
    body('password').isLength({ min: 5 })

] ,async (req, res)=>{
    //if there are errors return bad request an the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check wheater user with the same email exists already
    try {
        
    
        let user = await User.findOne({email: req.body.email});
        
        // console.log(user);
        
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        user = await User.create({
            name: req.body.name,
            // password: req.body.password,
            password:secPass, //secure password
            email: req.body.email
        })

        // .then(user => res.json(user))
        // .catch(err=>{
        //     console.log(err)
        //     res.json({error:'Please enter a unique value', message:err.message})}); 

        const data={
            user:{
                id:user.id
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);
        // console.log(authtoken);
        
        // res.json(user)
        res.json({authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");        
    }
})

module.exports = router;