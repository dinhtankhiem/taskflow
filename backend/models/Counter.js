//ho tro cho viec generate id cho cac model

const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    //ten bo dem: task, project, user
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    value: {
        type: Number,
        default: 0,
    },
});

const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;