const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Require model
const User = require('../../models/User')

//ROUTES

//@route POST api/users
//@desc  Create an user
//@acces public
router.post('/', (req, res) => {

    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400).json({
            msg: 'Please complete all fields'
        })
    }else{
        User.findOne({email})
            .then( user => {
                if(user){ res.status(400).json({msg: 'This email is already used'})}

                const newUser = new User({
                    name,
                    email,
                    password})

                    bcrypt.genSalt(10, (err , salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                   .then( user => {

                                        jwt.sign(
                                            {id: user.id},
                                            require('../../config/keys').jwtSecret,
                                            {expiresIn: 3600},
                                            (err, token) => {
                                                if(err) throw err;
                                                res.json({
                                                    token,
                                                    user: {
                                                        id: user.id,
                                                        name: user.name,
                                                        email: user.email
                                                    }
                                                   })
                                            }
                                        )
                                   })
                        })
                    })
            })
    }


   
    
})


module.exports = router; 