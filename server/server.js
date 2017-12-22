const express = require('express');
const path = require('path');
const app = express();

const expressSession = require('express-session');
// the passport require stuff
const passport = require('passport');
const passportLocal = require('passport-local');


// The required modules
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
require('./config/config');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');



app.use(expressSession({
    secret: process.env.PROCESS_SECRET || 'bobzuidema',
    resave: true,
    saveUninitialized: true,
    name: 'sessionId',
    proxy: true,
    cookie: {
        secure: false,
        maxAge: 3600000
    }
}));

// Let express know we want to use passport
app.use(passport.initialize());
app.use(passport.session());

// must tell passport to use the local strategy
passport.use(new passportLocal.Strategy(function (username, password, done) {
    // Here is where we handle the actual login
    // Might have to get the pwd from the database
    //   console.log('Variables ', username, password);
    User.findForLogin(username, password).then((result) => {
        if (result) {
                      console.log('in if of passport ', username);
            return done(null, { username: username });
        } else {
            //           console.log('in else of passport');
            return done(null, false, { message: 'Unable to login' });
        }
    }, (err) => {
        //       console.log('in error of passport');
        return done(err, false, { message: 'Unable to login' });
    });


}));

// Must tell the session how to serialize the object in session
passport.serializeUser(function (user, done) {
    console.log('User ', user);
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('User id', user);
    //  Query the database and build an object back
    var username = user.username;
    User.findByUsername(username).then((result) => {
        if (result) {
            done(null, { username: username });
        }
    }, (err) => {
        return done(err);
    });
});

app.set('views', './views'); // sets the location to look for files in the views folder

app.set('view engine', 'ejs'); // 'ejs' is the file extension 

app.use('/assets', express.static(path.join(__dirname + '/../public')));

const port = process.env.PORT || 3000;


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    next();
});

app.get('/', function (req, res) {
    console.log('Request URL: ', req.url);
    console.log('Cookies: ', req.cookies);
    res.render('index', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

app.get('/register', function (req, res) {

    res.render('register', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

app.get('/login', function (req, res) {

    res.render('login');
});

app.post('/login', function (req, res, next) {
    console.log('In login post ');
    passport.authenticate('local', function (err, user, info) {
        console.log('User in login post ', user);
        if (err) {
            return next(err);
        }
        if (!user) {
            // *** Display message without using flash option
            // re-render the login form with a message
            return res.render('login', { message: info.message })
        }
        console.log('isauth ', req.isAuthenticated());
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.render('index', {
                isAuthenticated: req.isAuthenticated(),
                user: req.user
            });
        });

    })(req, res, next);
});

// app.get('/register', function (req, res) {
//     //res.render('register');
//     var email = 'robert.m.zuidema@gmail.com';
//     var password = 'zuidema';
//     User.findByCredentials(email, password).then((obj) => {
//         console.log('Object ', obj);
//     }, (err) => {
//         console.log(err);
//     });
//     res.render('register');
// });

app.post('/register', (req, res) => {

    console.log('Body: ', req.body);

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.encrypted_password;
    var user = new User({ username, email, password });
    user.save().then((doc) => {
        console.log('doc ', doc);
    }, (error) => {
        res.status(400).send(error);
    });

});

app.listen(port, function () {
    console.log('Listening for localhost port: ', port);
});