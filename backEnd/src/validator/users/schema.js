const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    fullname: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    no_contact: Joi.number().required(),
    address: Joi.string().required(),
    sosmed_url: Joi.array().items(Joi.string())
});

const putUserSchema = Joi.object({
    username: Joi.string(),
    fullname: Joi.string(),
    address: Joi.string(),
    sosmed_url: Joi.array().items(Joi.string)
});

module.exports = { userSchema, putUserSchema }

// username, fullname, address, sosmed_url, no_contact 