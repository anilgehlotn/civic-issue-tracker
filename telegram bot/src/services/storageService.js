// Storage service - MongoDB integration for grievances
const Grievance = require('../models/Grievance');



function generateIssueId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `GRV-${timestamp}-${randomPart}`;
}

async function addGrievance(record) {
    try {
        const grievance = new Grievance({
            issueId: record.issueId,
            chatId: record.chatId,
            userName: record.name,
            userContact: record.contact,
            wardNumber: record.ward,
            photoFileId: record.photoFileId,
            photoFileUniqueId: record.photoFileUniqueId,
            photoUrl: record.photoUrl,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        const savedGrievance = await grievance.save();
        return savedGrievance;
    } catch (error) {
        console.error('Error saving grievance:', error);
        throw error;
    }
}

async function getGrievances() {
    try {
        return await Grievance.find({});
    } catch (error) {
        console.error('Error fetching grievances:', error);
        throw error;
    }
}

async function findGrievanceById(issueId) {
    try {
        return await Grievance.findOne({ issueId });
    } catch (error) {
        console.error('Error finding grievance:', error);
        throw error;
    }
}

async function updateGrievanceStatus(issueId, status, updateMessage, updatedBy) {
    try {
        const grievance = await Grievance.findOne({ issueId });
        
        if (!grievance) {
            return null;
        }

        grievance.status = status;
        grievance.lastUpdate = {
            message: updateMessage,
            updatedBy: updatedBy,
            updatedAt: new Date(),
        };
        
        grievance.updates.push({
            message: updateMessage,
            updatedBy: updatedBy,
            timestamp: new Date(),
        });

        grievance.updatedAt = new Date();
        
        const updatedGrievance = await grievance.save();
        return updatedGrievance;
    } catch (error) {
        console.error('Error updating grievance:', error);
        throw error;
    }
}

async function assignGrievance(issueId, staffId, staffName) {
    try {
        const grievance = await Grievance.findOne({ issueId });
        
        if (!grievance) {
            return null;
        }

        grievance.assignedTo = {
            staffId,
            staffName,
            assignedAt: new Date(),
        };
        
        grievance.status = 'in-progress';
        grievance.updatedAt = new Date();
        
        const updatedGrievance = await grievance.save();
        return updatedGrievance;
    } catch (error) {
        console.error('Error assigning grievance:', error);
        throw error;
    }
}

async function getGrievancesByChatId(chatId) {
    try {
        return await Grievance.find({ chatId });
    } catch (error) {
        console.error('Error fetching grievances by chatId:', error);
        throw error;
    }
}

async function getGrievancesByWard(wardNumber) {
    try {
        return await Grievance.find({ wardNumber });
    } catch (error) {
        console.error('Error fetching grievances by ward:', error);
        throw error;
    }
}

module.exports = {
    generateIssueId,
    addGrievance,
    getGrievances,
    findGrievanceById,
    updateGrievanceStatus,
    assignGrievance,
    getGrievancesByChatId,
    getGrievancesByWard,
};
