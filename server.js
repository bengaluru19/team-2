const mongoose = require('mongoose');
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

const custSchema = mongoose.Schema({
    fname: String,
    lname: String,
    dob: {
        type: Date,
        default: Date.now
    },
    location: String,
    phno: Number,
    email: String,
    password: String,
    gender: String
});

const customer = mongoose.model('customer', custSchema);

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

const server = app.listen(port, () => console.log("Listening to http://localhost:" + port));