// Registration flow service
const registerSessions = new Map(); // chatId -> { step, data }
const { generateIssueId } = require('./storageService');
const { classifyImage, mapCategoryToRole } = require('./aiService');

const askContactNumber = (ctx, session) => {
    session.step = 'contact';
    ctx.reply('Thanks. What is your contact number?');
};

const askWardNumber = (ctx, session) => {
    session.step = 'ward';
    ctx.reply('Got it. What is your ward number?');
};

const askPhoto = (ctx, session) => {
    session.step = 'photo';
    ctx.reply('Please send a photo of the issue.');
};

function startRegistration(ctx) {
    const chatId = ctx.chat.id;
    const session = { step: 'name', data: {} };
    registerSessions.set(chatId, session);
    ctx.reply('Let us register your grievance. What is your name?');
}

function handleText(ctx) {
    const chatId = ctx.chat.id;
    const session = registerSessions.get(chatId);

    // Handle registration flow only
    if (!session) {
        return false;
    }

    const text = ctx.message.text.trim();

    if (session.step === 'name') {
        session.data.name = text;
        askContactNumber(ctx, session);
        return true;
    }

    if (session.step === 'contact') {
        const looksValid = /^[\d\s()+-]{7,20}$/.test(text);
        if (!looksValid) {
            ctx.reply('Please provide a valid contact number (digits, +, -, parentheses).');
            return true;
        }
        session.data.contact = text;
        askWardNumber(ctx, session);
        return true;
    }

    if (session.step === 'ward') {
        session.data.ward = text;
        askPhoto(ctx, session);
        return true;
    }

    if (session.step === 'photo') {
        ctx.reply('Please send a photo of the issue to complete the registration.');
        return true;
    }

    return false;
}

async function handlePhoto(ctx) {
    const chatId = ctx.chat.id;
    const session = registerSessions.get(chatId);

    if (!session || session.step !== 'photo') {
        return false;
    }

    const photos = ctx.message.photo;
    const bestPhoto = photos[photos.length - 1];

    const issueId = generateIssueId();

    try {
        // Get a view/download URL for the photo from Telegram
        const fileUrl = await ctx.telegram.getFileLink(bestPhoto.file_id);

        // Call AI to classify the image
        const aiCategory = await classifyImage(fileUrl.toString());
        const assignedRole = mapCategoryToRole(aiCategory);
        
        console.log(`[AI Classification] Issue ${issueId}: Category="${aiCategory}", Role="${assignedRole}"`);

        registerSessions.delete(chatId);
        ctx.reply(
            `✅ Your grievance has been received!\n\n` +
            `📋 Issue ID: ${issueId}\n` +
            `📂 Category: ${aiCategory || 'Unknown'}\n` +
            `👷 Assigned To: ${assignedRole}\n` +
            `📍 Ward: ${session.data.ward}\n\n` +
            `Your issue will be forwarded to the ${assignedRole} in Ward ${session.data.ward}.\n` +
            `You will be notified once action is taken. Thank you!`
        );
    } catch (error) {
        console.error('Error classifying image:', error);
        ctx.reply(
            `❌ Error classifying your grievance image. Please try again later.\n` +
            `Error: ${error.message}`
        );
    }

    return true;
}

module.exports = {
    startRegistration,
    handleText,
    handlePhoto,
};
