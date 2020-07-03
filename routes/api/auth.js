const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
//Require model
const User = require('../../models/User')

//ROUTES

//@route POST api/auth
//@desc  Authenticate user
//@acces public
router.post('/', (req, res) => {

    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({ msg: 'Please complete all fields' })
    }else{
        User.findOne({email})
            .then( user => {
                if(!user){ return res.status(400).json({msg: 'This email does not exist'})}

                    bcrypt.compare(password, user.password)
                            .then(isMatch => {
                                if(!isMatch) return res.status(400).json({msg: 'Password doen not match'})
                                
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
    }
})  

//@route GET api/users/user
//@desc  Het the current user
//@acces Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then( user => { 
            if(!user) throw Error('User does not exist'); 
            res.json({user}) })
})



module.exports = router; 