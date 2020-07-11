const mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
        text: {
            type: 'string',
            required: true
        },
        userSender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        userAccepter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
    ,{
        timestamps: true
    }
);
module.exports = mongoose.model('Message', UserSchema);