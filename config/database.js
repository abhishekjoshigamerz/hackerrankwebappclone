const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hackerRankClone');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('We are connected!');
    }
);

module.exports = db;