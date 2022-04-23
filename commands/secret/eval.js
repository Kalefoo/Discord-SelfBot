const Discord = require('discord.js-selfbot-v13');

module.exports = {
    name: 'eval',
    alias: 'e',
    description: 'Execute a JavaScript code without leaving Discord',

    async execute(client, message, args) {
        let limit = 2000;

        try {
        var code = args.join(' ');
        let evalued = await eval(code);

        if (typeof evalued !== "string")
            evalued = require("util").inspect(evalued, { depth: 0 })

        let txt = "" + evalued;

        if (txt.includes(client.token) || txt.includes(process.env.TOKEN)) return

        if (txt.length > limit) {
            message.reply({ content: 'The expressed code exceeds the character limit' })
        } else
            message.reply({content: `\`\`\`js\n${code}\n\n-------------------\n\n${txt}\n\`\`\``});
        } catch (err) {
            message.reply({content: `\`\`\`js\n${code}\n\n-------------------\n\n${err}\n\`\`\``});
        }
    }
}