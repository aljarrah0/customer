const faker = require('faker');
const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customer');

router.get('/', (req, res) => {
    for (let i = 0; i < 1000; i++) {
        let customer = new Customer();
        customer.name = faker.name.findName();
        customer.phone = faker.phone.phoneNumber();
        customer.isGold = faker.random.boolean();
        customer.save();
    }
    res.redirect('/api/customer');
});

module.exports = router;