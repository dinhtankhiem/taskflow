const mongoose = require('mongoose');
const generateId = require('../untils/generateId');

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    name: {
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
    tasksIds: {
        type: [String],
        ref: 'Task',
        trim: true,
        default: [],
    },
    membersIds: {
        type: [String],
        ref: 'User',
        trim: true,
        default: [],
    },
    status: {
        type: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        enum: ['active', 'inactive'],
        default: 'active',
    },
    color: {
        type: String,
        trim: true,
        default: '#000000',
    },
}, { timestamps: true });

projectSchema.pre('save', async function(next) {
    if (!this.projectId) {
        try {
            this.projectId = await generateId('project', 'PRJ');
        } catch (error) {
            next(error);
        }
    }
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;