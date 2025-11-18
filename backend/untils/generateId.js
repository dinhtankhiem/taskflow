const Counter = require('../models/Counter');

async function generateId(name, prefix) {
    const counter = await Counter.findOneAndUpdate({ name }, { $inc: { value: 1 } }, { new: true, upsert: true });
    const number = String(counter.value).padStart(4, '0');
    return `${prefix}-${number}`;
}

module.exports = generateId;