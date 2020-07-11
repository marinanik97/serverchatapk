const mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
        text: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        likes: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
        ]
    }
    ,{
        timestamps: true
    }
);
module.exports = mongoose.model('Post', UserSchema);