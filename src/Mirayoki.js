const { Client, Collection } = require('discord.js');

const client = new Client({ intents: 32767 });

client.commands = new Collection();

require('dotenv').config();

const fs = require('fs');

const color = require('cli-color');

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');
// These constants will hold all the .js files within the folders

const date = new Date();

console.log(color.green('DEPLOY'), 'Started a deploy', color.blackBright(`at ${date}`));
// Once you start running Mirayoki, this timestamp will be displayed on the console.

(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client);
	}
	client.handleEvents(eventFiles, './src/events');
	client.handleCommands(commandFolders, './src/commands');
	client.dbLogin();
	// This will login Mirayoki to the MongoDB
	client.login(process.env.SECRET_TOKEN);
	// This finally logs in Mirayoki into Discord's servers.
	module.exports = function () {
		return 'Passed checks';
	};
})();