// Registration flow service
const registerSessions = new Map(); // chatId -> { step, data }
const { generateIssueId, addGrievance } = require('./storageService');

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

function handlePhoto(ctx) {
    const chatId = ctx.chat.id;
    const session = registerSessions.get(chatId);

    if (!session || session.step !== 'photo') {
        return false;
    }

    const photos = ctx.message.photo;
    const bestPhoto = photos[photos.length - 1];

    const issueId = generateIssueId();

    const record = {
        issueId,
        chatId,
        name: session.data.name,
        contact: session.data.contact,
        ward: session.data.ward,
        photoFileId: bestPhoto.file_id,
    };

    // Save to MongoDB
    addGrievance(record)
        .then(() => {
            registerSessions.delete(chatId);
            ctx.reply(
                `✅ Your grievance has been registered successfully!\n\n` +
                `📋 Issue ID: ${issueId}\n` +
                `Please save this ID to track your grievance status using /status command.\n\n` +
                `Our team will review it and contact you soon. Thank you!`
            );
        })
        .catch((error) => {
            console.error('Error saving grievance:', error);
            ctx.reply(
                `❌ Error registering your grievance. Please try again later.\n` +
                `Error: ${error.message}`
            );
        });

    return true;
}

module.exports = {
    startRegistration,
    handleText,
    handlePhoto,
};
