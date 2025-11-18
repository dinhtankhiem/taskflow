const mongoose = require('mongoose');
const generateId = require('../untils/generateId');

const commentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    taskId: {
        type: String,
        ref: 'Task',
        trim: true,
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});