# Telegram Bot - Civic Issue Tracker

This is a Telegram bot for the Civic Issue Tracker system that allows citizens to register grievances and track their status.

## Features

- **Register Grievances**: Citizens can register civic issues by providing their name, contact, ward number, and uploading a photo
- **AI Classification**: Uses OpenRouter AI to automatically classify the type of issue from the uploaded photo
- **Status Tracking**: Check the status of registered grievances using Issue ID
- **Ward Support**: Get support contact information for specific wards

## Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or MongoDB Atlas)
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))
- OpenRouter API Key (from [OpenRouter](https://openrouter.ai))

### Installation

1. Install dependencies:
   ```bash
   cd "telegram bot"
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your credentials:
   ```
   BOT_TOKEN=your_telegram_bot_token_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   MONGODB_URI=mongodb://localhost:27017/civic-issue-tracker
   ```

### Running the Bot

Start the bot:
```bash
npm start
```

Alternatively, you can run it directly:
```bash
node src/index.js
```

## Bot Commands

- `/register` - Register a new grievance
- `/status` - Check status of your grievance
- `/contact` - Get ward support contact information
- `/help` - Display available commands

## Project Structure

```
telegram bot/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── Grievance.js       # Grievance data model
│   │   └── WardContact.js     # Ward contact data model
│   ├── services/
│   │   ├── aiService.js       # AI classification service
│   │   ├── registerService.js # Grievance registration logic
│   │   ├── statusCheckService.js # Status tracking logic
│   │   ├── contactService.js  # Ward contact service
│   │   └── storageService.js  # MongoDB operations
│   └── index.js               # Main bot entry point
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## AI Classification

The bot uses the OpenRouter API with the `allenai/molmo-2-8b:free` model to classify civic issues into categories such as:

- Bad road / Potholes / Broken sidewalk
- Bad water supply / Waterlogging
- Poor drainage system / Sewage leakage
- Garbage accumulation / Illegal dumping
- Streetlight outage
- Poor building construction

Based on the classification, the grievance is automatically assigned to the appropriate department:
- Road Engineer
- Water Department
- Drainage Department
- Sanitation Department
- Electrical Department
- Building Inspector

## Database Models

### Grievance
- Issue ID, chat ID, user information
- Photo file ID and URL
- Assignment details (staff, role)
- Status tracking (pending, in-progress, resolved, closed)
- Update history

### WardContact
- Ward number, office name
- Contact details (phone, email)
- Office address and hours
