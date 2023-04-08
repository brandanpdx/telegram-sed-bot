const { Telegraf } = require('telegraf');
const botToken = 'YOUR_BOT_TOKEN_HERE';

const bot = new Telegraf(botToken);

// Maximum number of messages to store
const maxMessages = 25;

// Array to store the message history
const messageHistory = [];

// Listen for text messages
bot.on('text', async (ctx) => {
    const message = ctx.message.text;
    const sedRegex = /^s\/(.*?)\/(.*?)(?:\/([gi]*))?$/;

    try {
        // Check if the message is a sed replacement command
        if (sedRegex.test(message)) {
            const matches = message.match(sedRegex);

            // Create a search pattern, escaping any special characters
            const searchPattern = matches[1].replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
            const search = new RegExp(`\\*?${searchPattern}\\*?`, matches[3]);
            const replace = matches[2];

            // Loop through the message history to find the most recent matching message
            for (let i = messageHistory.length - 1; i >= 0; i--) {
                if (search.test(messageHistory[i].text)) {
                    // Perform the replacement and send the result
                    const result = messageHistory[i].text.replace(search, (match) => `*${replace}*`);
                    const replyText = `@${messageHistory[i].username}: ${result}`;
                    await ctx.replyWithMarkdown(replyText).then((sentMessage) => {
                        // Add the bot's reply to the message history
                        messageHistory.push({ text: sentMessage.text, fromBot: true, username: ctx.from.username });
                        if (messageHistory.length > maxMessages) {
                            messageHistory.shift();
                        }
                    });
                    break;
                }
            }
        } else {
            // Add the received message to the message history
            messageHistory.push({ text: message, fromBot: false, username: ctx.from.username });
            if (messageHistory.length > maxMessages) {
                messageHistory.shift();
            }
        }
    } catch (error) {
        console.error('Error processing message:', error);
        ctx.reply('Sorry, an error occurred while processing your message. Please try again.');
    }
});

// Handle errors in the Telegraf bot
bot.catch((error) => {
    console.error('Error in the Telegraf bot:', error);
});

// Launch the bot
bot.launch();

console.log('Sedbot is running...');
