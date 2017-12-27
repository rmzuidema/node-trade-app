const express = require('express');
const router = express.Router();

var { Item } = require('./../models/item');
var { User } = require('./../models/user');

var { sendValidationEmail } = require('./../utils/emailHelper');



router.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    next();
});

router.get('/', function (req, res) {
    //    console.log('Request URL: ', req.url);
    //   console.log('Cookies: ', req.cookies);
    res.render('index', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

router.get('/register', function (req, res) {

    res.render('register', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

router.get('/login', function (req, res) {

    res.render('login');
});



router.post('/register', (req, res) => {

    //console.log('Body: ', req.body);

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.encrypted_password;
    var user = new User({ username, email, password });
    user.save().then((doc) => {
        console.log('doc ', doc);
        //sendValidationEmail(email,'robert.m.zuidema@gmail.com', 'Validate your email');
        return res.render('login', { message: 'login' })
    }, (error) => {
        res.status(400).send(error);
    });

});

router.get('/trade', function (req, res) {
    console.log('User in trade ', req.user);
    res.render('item', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

router.get('/browse', async (req, res) => {
    //console.log('User in browse ', req.user);
    var items = await Item.find({});
    //console.log(items);
    res.render('browse', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        items: items
    });
});

router.post('/trade', (req, res) => {

    //console.log('Body: ', req.body);

    var title = req.body.title;
    var description = req.body.description;
    var category = req.body.category;
    var payment = req.body.payment;
    var shipment = req.body.shipment;
    var exchangeWish = req.body.exchange;
    var minimumPrice = req.body.price;
    var owner = req.user.username;
    // console.log('Title ', title);
    // console.log('description ', description);
    // console.log('category ', category);
    // console.log('payment ', payment);
    // console.log('shipment ', shipment);
    // console.log('exchange ', exchangeWish);
    // console.log('price ', minimumPrice);
    // console.log('user ', owner);
    var item = new Item({ title, description, category, shipment, payment, sold: false, exchangeWish, minimumPrice, owner });
    item.save().then((result) => {
//        console.log(result);
        res.render('item', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    }, (error) => {
        console.log(error);
        res.status(400).send(error);
    });



});

router.post('/validateUsername', async (req, res) => {
    var username = req.body.username;
    //   console.log('Username in validate ', username);
    var theUser = await User.findByUsername(username);
    //    console.log('TheUser ', theUser);
    if (theUser) {
        res.status(200).send({ valid: false });
    } else {
        res.status(200).send({ valid: true });
    }

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;