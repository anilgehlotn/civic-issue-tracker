const mongoose = require('mongoose');

const wardContactSchema = new mongoose.Schema({
    wardNumber: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    officeName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    officeAddress: {
        type: String,
    },
    officeHours: {
        type: String,
        default: 'Mon-Fri, 9 AM - 5 PM',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('WardContact', wardContactSchema);
