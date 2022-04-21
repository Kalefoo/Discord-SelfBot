const Discord = require('discord.js-selfbot-v13');

module.exports = (client) => {
    console.log('[STATUS]'.green + ' Usuario ' + client.user.tag.red + ' conectado correctamente');

    const WebHookClient = new Discord.WebhookClient({ url: process.env.WH_URL });

    WebHookClient.send({ content: 'Hola! :wave:\n' + client.ws.ping + 'ms - <t:' + Math.floor(Date.now() / 1000) + ':R>' });

    function presence() {
        client.user.setPresence({status: 'dnd'})
    };

    presence();
};