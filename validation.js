//Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const valschema = Joi.object({
        Username : Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });
    return valschema.validate(data );
};


const loginValidation = (data) => {
    const valschema = Joi.object({   
        Username : Joi.string().min(6).required(),     
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });
    return valschema.validate(data );
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;