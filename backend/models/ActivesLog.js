const mongoose = require('mongoose');
const generateId = require('../untils/generateId');

const activeLogSchema = new mongoose.Schema({
    activeLogId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        ref: 'User',
        trim: true,
        required: true,
    },
    taskId: {
        type: String,
        ref: 'Task',
        trim: true,
        required: true,
    },
    projectId: {
        type: String,
        ref: 'Project',
        trim: true,
        required: true,
    },
    commentId: {
        type: String,
        ref: 'Comment',
        trim: true,
        required: true,
    },
    tagId: {
        type: String,
        ref: 'Tag',
        trim: true,

        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

activeLogSchema.pre('save', async function(next) {
    if (!this.activeLogId) {
        try {
            this.activeLogId = await generateId('activeLog', 'ACT');
        } catch (error) {
            next(error);
        }
    }
});

const ActiveLog = mongoose.model('ActiveLog', activeLogSchema);
module.exports = ActiveLog;