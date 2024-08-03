const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const bodyParser = require('body-parser');

const app = express()
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

router.post( "/register", async ( req, res ) => {
    const {name ,email, password } = req.body;
    console.log(req.body);
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json( {message:'Already registered'})
        }
        user = new User({
            name,
            email,
            password 
        });
        user.password = await bcrypt.hash(password, 10);
        console.log("iuh");
        await user.save();
        res.status(200).json({ message: "success" })
    }catch (e){
        res.status(500).send(e.message);
}
});

router.post("/login", async ( req, res ) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            res.status(400).json({ message: 'invalid user'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if(!isMatch){
            res.status(400).json({ message: 'invalid password'});
        }
        const payLoad = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: "1h" }, ( err, token ) => {
            if(err){
                throw err;
            }
            res.status(200).json({ token });
        })
    }catch(e){
        res.status(400).send('server error');
    }
})

module.exports = router;