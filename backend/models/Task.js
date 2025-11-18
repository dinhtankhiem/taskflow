const mongoose = require('mongoose');
const generateId = require('../untils/generateId');
const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },

    ownerId: {
        type: String,
        ref: 'User',
        trim: true,
        required: true,
    },

    projectId: {
        type: String,
        ref: 'Project',
        trim: true,
        default: null,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        default: null,
    },
    tags: {
        type: [String],
        default: [],
    },
    order: {
        type: Number,
        default: 0,
    },
    priority: {
        type: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    status: {
        type: {
            type: String,
            enum: ['todo', 'in progress', 'completed'],
            default: 'todo',
        },
        enum: ['todo', 'in progress', 'completed'],
        default: 'todo',
    },

    parentTaskId: {
        type: String,
        ref: 'Task',
        trim: true,
        default: null,
    },

    assignedUsers: {
        type: [String],
        ref: 'User',
        trim: true,
        default: [],
    }

}, { timestamps: true });

taskSchema.pre('save', async function(next) {
    if (!this.taskId) {
        try {
            this.taskId = await generateId('task', 'TAS');
        } catch (error) {
            next(error);
        }
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;