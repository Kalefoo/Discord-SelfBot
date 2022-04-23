const Discord = require('discord.js-selfbot-v13');

module.exports = (client) => {
    console.log('[LOGIN]'.green + ' Logged in as ' + client.user.tag.red);

    const WebHookClient = new Discord.WebhookClient({ url: process.env.WH_URL });

    WebHookClient.send({ content: 'Hello! :wave:\n' + client.ws.ping + 'ms - <t:' + Math.floor(Date.now() / 1000) + ':R>' });

    function presence() {
        client.user.setPresence({status: 'dnd'})
    };

    presence();
};