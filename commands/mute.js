const Discord = require('discord.js')

module.exports = {
    name: "mute",
        aliases: ['뮤트'],
    description: "Mute a member from your server",

    async run (client, message, args) {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don\'t have permission to run this command");

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!user) message.channel.send("This user can't be found anywhere in this server");

        if(user.id === message.author.id) return message.channel.send("You cannot mute yourself you imbecile");

        let role = message.guild.roles.cache.find(x => x.name === "mute");

        if(!role) return message.channel.send("Cannot find the muted role");

        let reason = args.slice(1).join(" ");
        if(reason === null) reason = "Unspecified"

        user.roles.add(role);

        await message.channel.send(`${user}님께서 서버에서 뮤트 되셨습니다.\n뮤트된 사유 | ${reason}`)

        user.send(`${message.guild.name}서버에서 뮤트 되셨습니다.\n뮤트된 사유 | ${reason}`);
    }
}