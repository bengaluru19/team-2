const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
require('dotenv').config()
const app = express();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const port = process.env.PORT;

const url = 'mongodb://ds347707.mlab.com:47707/cfg';
const auth = {
    auth: {
        user: db_user,
        password: db_pass
    },
    useNewUrlParser:true,
    useCreateIndex: true
};

mongoose.connect(url, auth, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to mLab User: ' + auth.auth.user);
    }
});

const vendorSchema = mongoose.Schema({
    category: String,
    fname: String,
    lname: String,
    address: String,
    phno: Number,
    pin: Number
});

const custSchema = mongoose.Schema({
    fname: String,
    lname: String,
    dob: {
        type: Date
    },
    location: String,
    phno: Number,
    email: String,
    password: String,
    gender: String
});

const customer = mongoose.model('customer', custSchema);
const vendor = mongoose.model('vendors', vendorSchema);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// Handle Sessions
app.use(session({
    secret:"mySecret",
    saveUninitialized: true,
    resave: false,
    cookie:{
        expires: null
    }
}));

app.post('/api/register', function(req, res){
    if(req.body.pass1 === req.body.pass2){
        let hash = bcrypt.hashSync(req.body.pass1, 10);
        let data = {
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            location: req.body.location,
            phno: req.body.phno,
            email: req.body.email,
            password: hash,
            gender: req.body.gender
        };
        customer.create(data, (err, doc) => {
            if(err) res.send(err);
            else res.json(doc);
        });
    }else{
        res.json("pass");
    }
});

app.get('/api/getCats', function(req, res) {
    vendor.find((err, doc) => {
        if(err) res.send(err);
        else res.json(doc);
    });
});

app.get('/api/getSelectedCat/:cat', (req, res) => {
    vendor.find({category: req.params.cat}, (err, doc) => {
        if(err) res.send(err);
        else res.json(doc); 
    });
});

const server = app.listen(port, () => console.log("Listening to http://localhost:" + port));