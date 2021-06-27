const ms = require('ms');
module.exports = {
    name: 'mute',
    aliases: ['m'],
    description: "mutes someone, and dont let them read or write any messages (Think of it as a soft ban)",
    execute(message, args, cmd, client, Discord) {
        const noPerms = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Access denied')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You don\'t have the **Kick Members** permission to mute someone!')

        const errorMute = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('There was an error while muting this member. (Did you mention it?)')

        const noImNot = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Error')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('You can\'t mute yourself.')

        const niceTry = new Discord.MessageEmbed()

            .setColor('#FF5733')
            .setTitle('Nice try')
            .setDescription(`ROBOTS ARE BETTER THAN YOU.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('')

        if (message.member.permissions.has("KICK_MEMBERS")) {
            const target = message.mentions.users.first();
            if (target) {
                if (target == message.author.id) return message.channel.send(noImNot);
                let memberTarget = message.guild.members.cache.get(target.id);
                if (memberTarget == 795480018469781505 || 834492523295801355) return message.channel.send(niceTry);
                if (!args[1]) {
                    const muteOK = new Discord.MessageEmbed()

                        .setColor('#55C2FF')
                        .setTitle('Muted succesfully')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`<@${memberTarget.user.id}> has been muted.`)
                    memberTarget.roles.remove('796931063120920636');
                    memberTarget.roles.add('796927664475865148');
                    message.channel.send(muteOK);
                    message.delete();
                    return
                }
                const timedMuteOK = new Discord.MessageEmbed()

                    .setColor('#55C2FF')
                    .setTitle('Muted succesfully')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`)
                memberTarget.roles.remove('796931063120920636');
                memberTarget.roles.add('796927664475865148');
                message.channel.send(timedMuteOK);
                message.delete();

                setTimeout(function () {
                    memberTarget.roles.remove('796927664475865148');
                    memberTarget.roles.add('796931063120920636');
                }, ms(args[1]))
            } else {
                message.channel.send(errorMute);
            }
        } else {
            message.channel.send(noPerms);
        }
    }
}