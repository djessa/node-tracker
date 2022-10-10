const mongoose  = require('../config/database');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    log: {
        type: Array,
        required: false
    }
}, {versionKey: false});

const User = mongoose.model('User', userSchema);

module.exports = User;