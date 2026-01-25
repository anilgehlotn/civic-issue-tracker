const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    issueId: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    // User Information
    chatId: {
        type: String,
        required: true,
        index: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userContact: {
        type: String,
        required: true,
    },
    wardNumber: {
        type: String,
        required: true,
        index: true,
    },
    photoFileId: {
        type: String,
        required: true,
    },
    
    // Issue Assignment and Tracking
    assignedTo: {
        staffId: String,
        staffName: String,
        assignedAt: Date,
    },
    
    // Status and Updates
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved', 'closed'],
        default: 'pending',
        index: true,
    },
    lastUpdate: {
        message: String,
        updatedBy: String, // Staff member who gave the update
        updatedAt: Date,
    },
    updates: [
        {
            message: String,
            updatedBy: String,
            timestamp: Date,
        }
    ],
    
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now,
        index: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Grievance', grievanceSchema);
