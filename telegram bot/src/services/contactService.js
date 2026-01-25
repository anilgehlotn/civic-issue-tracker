// Contact support service for ward-specific support
const contactSessions = new Map(); // chatId -> true (awaiting ward number)
const WardContact = require('../models/WardContact');

function startContactSupport(ctx) {
    const chatId = ctx.chat.id;
    contactSessions.set(chatId, true);
    ctx.reply('Please enter your ward number to get support contact details:');
}

function handleContactInput(ctx) {
    const chatId = ctx.chat.id;
    
    if (!contactSessions.has(chatId)) {
        return false;
    }

    const wardNumber = ctx.message.text.trim();
    contactSessions.delete(chatId);
    
    // Fetch from MongoDB
    WardContact.findOne({ wardNumber })
        .then((contact) => {
            if (!contact) {
                ctx.reply(
                    `❌ No contact information found for Ward ${wardNumber}.\n\n` +
                    `Please verify your ward number or contact the main office at +91-1234567890.`
                );
                return;
            }

            let contactMessage = `📞 Ward ${wardNumber} Support Contact\n\n`;
            contactMessage += `Office: ${contact.officeName}\n`;
            contactMessage += `Phone: ${contact.phone}\n`;
            contactMessage += `Email: ${contact.email}\n`;
            
            if (contact.officeAddress) {
                contactMessage += `Address: ${contact.officeAddress}\n`;
            }
            
            contactMessage += `\nOffice Hours: ${contact.officeHours}\n`;
            contactMessage += `\nFeel free to reach out with any queries or grievances!`;

            ctx.reply(contactMessage);
        })
        .catch((error) => {
            console.error('Error fetching ward contact:', error);
            ctx.reply(`❌ Error retrieving contact information. Please try again later.`);
        });

    return true;
}

module.exports = {
    startContactSupport,
    handleContactInput,
};
