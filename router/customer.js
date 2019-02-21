const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', (req, res) => {
    Customer.find((err, customers) => {
        if (err) return console.error(err.message);
        res.render('customerTable', { customers });
    }).sort('name')
});

router.get('/addCustomer', (req, res) => {
    res.render('addCustomer')
});

router.get('/edit', (req, res) => {
    res.render('editCustomer');
});

router.get('/:id', (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) return res.status(404).send(err.message);
        res.send(customer)
    });
});

router.post('/', (req, res) => {
    console.log(req.body)

    validate(req.body)
        .then(() => {
            let { name, phone, isGold } = req.body;
            new Customer({
                name,
                phone,
                isGold
            }).save(() => {
                res.redirect('/api/customer')
            })
        })
        .catch(err => res.status(400).send(err.message));
});




router.put('/:id', (req, res) => {
    console.log(">>>>>>>>>>> start")
    console.log(req.body);
    validate(req.body)
        .then(() => {
            let { name, phone, isGold } = req.body;
            Customer.findByIdAndUpdate(req.params.id, {
                name,
                phone,
                isGold
            },(err,result)=>{
                if(err)return res.status(404).send(err.message);
                res.redirect('/api/customer')
            })
        })
        .catch(err => res.status(400).send(err.message));
});


router.post('/deleteCustomer/:name', (req, res) => {
    console.log(req.params.name);
    res.end('Delete customer')
});
// Anvalid URL 
router.get('*', (req, res) => {
    console.log("Sorry,this is an anvalid URL.");
    res.end("Sorry, this is an anvalid URL.")
});
module.exports = router;