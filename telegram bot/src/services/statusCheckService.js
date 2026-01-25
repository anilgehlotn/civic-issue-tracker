// Status check service for grievance tracking
const statusSessions = new Map(); // chatId -> true (awaiting issue ID)
const { findGrievanceById } = require('./storageService');

function startStatusCheck(ctx) {
    const chatId = ctx.chat.id;
    statusSessions.set(chatId, true);
    ctx.reply('Please enter your Issue ID (e.g., GRV-1000) to check the status:');
}

function handleStatusInput(ctx) {
    const chatId = ctx.chat.id;
    
    if (!statusSessions.has(chatId)) {
        return false;
    }

    const issueId = ctx.message.text.trim();
    statusSessions.delete(chatId);
    
    // Fetch from MongoDB
    findGrievanceById(issueId)
        .then((grievance) => {
            if (!grievance) {
                ctx.reply(`❌ No grievance found with Issue ID: ${issueId}\n\nPlease check your ID and try again.`);
                return;
            }

            let statusEmoji = '🟡';
            if (grievance.status === 'in-progress') {
                statusEmoji = '🔵';
            } else if (grievance.status === 'resolved') {
                statusEmoji = '🟢';
            } else if (grievance.status === 'closed') {
                statusEmoji = '⚪';
            }

            let statusMessage = `📋 Grievance Status\n\n`;
            statusMessage += `Issue ID: ${grievance.issueId}\n`;
            statusMessage += `Status: ${statusEmoji} ${grievance.status.toUpperCase()}\n`;
            statusMessage += `Name: ${grievance.userName}\n`;
            statusMessage += `Ward: ${grievance.wardNumber}\n`;
            statusMessage += `Registered: ${new Date(grievance.createdAt).toLocaleString()}\n`;

            if (grievance.assignedTo && grievance.assignedTo.staffName) {
                statusMessage += `\nAssigned to: ${grievance.assignedTo.staffName}\n`;
                statusMessage += `Assigned on: ${new Date(grievance.assignedTo.assignedAt).toLocaleString()}\n`;
            }

            if (grievance.lastUpdate && grievance.lastUpdate.message) {
                statusMessage += `\n📢 Last Update:\n`;
                statusMessage += `${grievance.lastUpdate.message}\n`;
                statusMessage += `By: ${grievance.lastUpdate.updatedBy}\n`;
                statusMessage += `On: ${new Date(grievance.lastUpdate.updatedAt).toLocaleString()}\n`;
            }

            statusMessage += `\nWe'll notify you once there's an update. Thank you for your patience!`;

            ctx.reply(statusMessage);
        })
        .catch((error) => {
            console.error('Error fetching grievance:', error);
            ctx.reply(`❌ Error retrieving grievance information. Please try again later.`);
        });

    return true;
}

module.exports = {
    startStatusCheck,
    handleStatusInput,
};
