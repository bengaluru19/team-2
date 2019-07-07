const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const ip = require('ip');
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

const orderSchema = mongoose.Schema({
    user_email: String,
    menu: Object,
    vendor: String,
    pending: Boolean,
    od: {
        type: Date,
        default: Date.now
    }
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
    gender: String,
    location: {
        type: { type: String },
        coordinates: Array
    },
});
custSchema.index({ location: "2dsphere" });
const customer = mongoose.model('customer', custSchema);
const vendor = mongoose.model('vendors', vendorSchema);
const order = mongoose.model('order', orderSchema);

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
        // let hash = bcrypt.hashSync(req.body.pass1, 10);
        let data = {
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            location: req.body.location,
            phno: req.body.phno,
            email: req.body.email,
            password: req.body.pass1,
            gender: req.body.gender
        };
        customer.create(data, (err, doc) => {
            if(err) res.send(err);
            else res.json(doc);
        });
    } else {
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

function checkAuth(req, res, next) {
    
    if (!req.session.email) {
      res.send('You are not authorized to view this page <a href="/"> Go Back</a>');
    } else {
      next();
    }
}

app.get('/logged', checkAuth, function (req, res) {
    res.sendFile( __dirname + '/public/templates/console.html');
});

app.get('/user/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/user/login', function (req, res) {
    var post = req.body;
    // let hash = bcrypt.hashSync(req.body.pass, 10);

    customer.findOne({email: post.email}, (err, doc) => {
        // console.log(doc);
        if (post.email === doc.email && post.password === doc.pass) {
          req.session.email = doc.email;
          res.redirect('/logged');
        } else {
          res.send('Bad user/pass');
        }
    });
});

app.post('/api/user/ordered', (req, res) => {
    // console.log(req.body);
    const query = {
        user_email: req.session.email,
        menu: req.body.menu,
        vendor: req.body.name,
        pending: true
    };
    order.create(query, (err, doc) => {
        if(err) res.send(err);
        else res.json(doc);
    }); 
});

app.get('/cust/orders', (req, res) => {
    order.find((err, doc) => {
        if(err) res.send(err);
        else res.json(doc);
    });
});

app.get('/api/getOrder', (req, res) => {
    order.find((err, doc) => {
        if(err) res.send(err);
        else res.json(doc);
    });
});

const server = app.listen(port, () => console.log("Listening to http://localhost:" + port));