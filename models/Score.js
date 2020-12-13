const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    mode: {
        type: String,
        default: 'single',
    }
});

module.exports = mongoose.model('scores', scoreSchema );
