# Folder Hub Bot

## Description

This telegram bot stores and categorizes folders in telegram.

## Live Demo

The bot is currently running and can be tested. You can interact with the bot by visiting the following link:  
[Try the Folder Hub](https://t.me/FolderHubBot)

## Installation

To install and run the bot, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/mahhis/folder-hub.git
    ```

2. Navigate to the project folder:

    ```bash
    cd folder-hub
    ```

3. Launch the [mongo database](https://www.mongodb.com/) locally

4. Create a `.env` file and add the necessary environment variables.

5. Install dependencies using Yarn:

    ```bash
    yarn install
    ```
6. To start the bot, run the following command::

    ```bash
    yarn start
    ```    

## Environment variables

- `TOKEN` — Telegram bot token
- `MONGO`— URL of the mongo database

Also, please, consider looking at `.env.example`.




