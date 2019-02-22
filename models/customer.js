const Joi = require('joi');
const mongoose = require('mongoose');

// definde shcema
// create class for shcema

const Customer = mongoose.model('Customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 9
    },
    isGold: {
        type: String,
        enum: ['true', 'false'],
    }
}));

function validateCustomer(customer) {
    let shcmea = {
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(9).max(25).required(),
        isGold: Joi.string().only(['false', 'true'])
    }
    return Joi.validate(customer, shcmea)
    // .then(()=> console.log('Yse'))
    // .catch(err=>console.error(err.message));
}

exports.Customer = Customer;
exports.validate = validateCustomer;