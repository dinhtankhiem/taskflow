const mongoose = require('mongoose');
const generateId = require('../untils/generateId');

const userSchema = new mongoose.Schema({
    userId: {
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
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    avatar: {
        type: String,
        trim: true,
        default: null,
    },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.userId) {
        try {
            this.userId = await generateId('user', 'USR');
        } catch (error) {
            next(error);
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;