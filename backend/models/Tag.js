const mongoose = require('mongoose');
const generateId = require('../untils/generateId');

const tagSchema = new mongoose.Schema({
    tagId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    ownerId: {
        type: String,
        ref: 'User',
        trim: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
        default: '#000000',
    },
}, { timestamps: true });

tagSchema.pre('save', async function(next) {
    if (!this.tagId) {
        try {
            this.tagId = await generateId('tag', 'TAG');
        } catch (error) {
            next(error);
        }
    }
});