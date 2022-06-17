const router = require('express').Router();
const User = require('../model/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation');


router.post('/register', async (req,res) =>{

    //Lets validate the data before making a user
    
    /*  
     const {error} = valschema.validate(req.body );
     if(error) return res.status(400).send(error.details[0].message); */
    
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
 
    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
        Username: req.body.Username,
        email: req.body.email,
        password:hashedPassword
    }); 
    try{
        const saveduser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});
 
// Login
router.post('/login', async (req,res) => {

    //Lets validate the data before making a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');

    //checking if password is correct
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if(!validpass) return res.status(400).send('Invalid password');

    //Create and assisn a token
   /*  const token = {token: jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)};
    res.header('auth-token', token).send(token); */

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.status(200).send({
        id: user._id,
        Username: user.Username,
        email: user.email,
        token: token
      });


   /*  // create a jwt token containing the user id that expires in 15 minutes
    return jwt.sign({ sub: user.id, id: user.id }, config.secret, { expiresIn: '15m' }); 
    
     const refreshToken = generateRefreshToken(user, ipAddress);

    // save refresh token
    await refreshToken.save();
    
    */

   // res.send('Logged in!');


})

module.exports = router; 

