const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: true,
        min:6
    },
    email: {
        type: String,
        required: true,
        max:200,
        min: 6
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
},
{timestamps:true});

module.exports = mongoose.model('User', loginSchema)


/* {    
    "email": "gab555@yahoo.com",
    "password": "gab555"
} */