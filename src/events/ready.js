const color = require('cli-color');
const array = require('./statusArray.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(color.green('DEPLOY'), 'Mirayoki has been deployed succesfully', color.blackBright(`at ${Date()}`));
		async function pickFirstStatus() {
			try {
				const option = Math.floor(Math.random() * array.status.length);
				await client.user.setPresence({
					activities: [{
						name: array.status[option].name,
						type: array.status[option].type,
					},
					],
					status: 'online',
				});
				console.log(color.cyanBright('PRESENCE'), `Deployed successfully as ${array.status[option].type} (${array.status[option].name})`, color.blackBright(`at ${Date()}`));
			} catch (error) {
				console.log(color.red('ERROR'), `Failed to deploy RP: ${error}`, color.blackBright(`at ${Date()}`));
			}
		}
		async function pickNextStatus() {
			try {
				const option = Math.floor(Math.random() * array.status.length);
				await client.user.setPresence({
					activities: [{
						name: array.status[option].name,
						type: array.status[option].type,
					},
					],
					status: 'online',
				});
				console.log(color.cyanBright('PRESENCE'), `Updated successfully as ${array.status[option].type} (${array.status[option].name})`, color.blackBright(`at ${Date()}`));
			} catch (error) {
				console.log(color.red('ERROR'), `Failed to update RP: ${error}`, color.blackBright(`at ${Date()}`));
			}
		}
		pickFirstStatus();
		setInterval(pickNextStatus, 3600000);
	}
};