const express = require('express');
const mongoose = require('mongoose');
const customer = require('./router/customer');
const fakerData = require('./router/faker');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/customers', { useNewUrlParser: true })
    .then(() => console.log('DB customers is connected'))
    .catch(err => console.error(err.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/customer', customer);
app.use('/api/faker', fakerData);
app.use('/public',express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index')
})

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`the sever connect on port : ${port}`));