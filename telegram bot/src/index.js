require('dotenv').config({path: "../.env"});
const { Telegraf } = require('telegraf');
const { connectDB } = require('./config/db');
const {
    startRegistration,
    handleText: handleRegistrationText,
    handlePhoto,
} = require('./services/registerService');
const { startStatusCheck, handleStatusInput } = require('./services/statusCheckService');
const { startContactSupport, handleContactInput } = require('./services/contactService');

// Initialize MongoDB connection
connectDB().catch(error => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome to Grievance Redressal Bot! Type /help to see available commands.'));

bot.help((ctx) => ctx.reply('/register - Register a new grievance\n/status - Check status of your grievance\n/contact - Contact support'));

bot.command('register', (ctx) => startRegistration(ctx));

bot.command('status', (ctx) => startStatusCheck(ctx));

bot.command('contact', (ctx) => startContactSupport(ctx));

bot.on('text', (ctx) => {
    const handled = handleRegistrationText(ctx) || handleStatusInput(ctx) || handleContactInput(ctx);
    if (!handled) {
        ctx.reply('I did not understand that. Type /help to see available commands.');
    }
});

bot.on('photo', (ctx) => {
    handlePhoto(ctx);
});

bot.launch();