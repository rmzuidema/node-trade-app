const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/etrades', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB');
    var email = 'robert.m.zuidema@gmail.com';
    db.collection('users').findOne({email}).then ((docs) => {
        console.log(docs);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Run into an Error ', err);
    });

    db.close();

});