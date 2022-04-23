const Discord = require('discord.js-selfbot-v13');

module.exports = (client, message) => {
    let prefix = process.env.PREFIX;

    const perms = message.author.id === process.env.OWNER || message.author.id === process.env.AUTH;

    if (!perms) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command) || c.description);

    if (cmd) {
        cmd.execute(client, message, args)

        const WebHookClient = new Discord.WebhookClient({ url: process.env.WH_URL });

        WebHookClient.send({ content: '📑 **COMMAND USED**\n\n```\nUser: ' + message.author.tag + '\nUser ID: ' + message.author.id + '\nCommand: ' + cmd.name + '\nAlias: ' + cmd.alias + '\nDescription: ' + cmd.description + '\nMessage: ' + message.content + '```' });
    }
};