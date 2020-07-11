const mongoose = require('mongoose');

module.exports.connection = () =>{
    mongoose.connect('mongodb://login:password@db:27017', {useNewUrlParser: true}, (a) =>{
        console.log(a);
    });

}