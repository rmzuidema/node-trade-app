const {MongoClient} = require('mongodb');
const {User} = require('./../server/models/user');


MongoClient.connect('mongodb://localhost:27017/etrades', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB');
    // Pass an object to handle complex queries
   var userRet = User.findByEmail('zuidema@bellsouth.net');
   
   
     console.log(userRet);
    db.close();
    

});