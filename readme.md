
# Telegram Sedbot

This is a simple Telegram bot that performs sed-like replacements on the last message that matches a given search pattern. The bot stores a history of the last 25 messages in the chat, including messages sent by other users and the bot itself.

When a user sends a message in the chat with the format `s/search/replace`, the bot searches the message history for the most recent message that matches the `search` pattern and performs a replacement of the matching text with the `replace` text.

The bot also prepends the username of the sender of the original message to the bot's reply message, so it's clear whose message was modified.

## Usage

To use this bot, you will need to create a Telegram bot and obtain an API token. You can follow the instructions in the official [Telegram Bot API documentation](https://core.telegram.org/bots#creating-a-new-bot) to create a new bot and obtain an API token.

Once you have the API token, you can clone this repository and install the dependencies:

    git clone https://github.com/your-username/telegram-sedbot.git
    cd telegram-sedbot
    npm install	


Next, create a `.env` file in the root directory of the project and add your Telegram bot API token:

    BOT_TOKEN=YOUR_BOT_TOKEN

Finally, start the bot with the following command:

    node index.js

The bot should now be running and listening for messages in the chat. You can test the bot by sending a message in the chat with the format `s/search/replace`.

## License

This code is licensed under the MIT License.

## Contributions

Contributions to this project are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.
