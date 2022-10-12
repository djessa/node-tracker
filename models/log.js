const mongoose  = require('../config/database');

const logSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {versionKey: false});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;