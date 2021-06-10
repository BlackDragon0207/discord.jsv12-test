const Discord = require('discord.js')
const db = require('quick.db');
const warnings = require('./warnings');

module.exports = {
    name: "deletewarns",
        aliases: ['경고취소'],
    description: "Delete a member's warns",


    async run (client, message, args){
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that.');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(user.id === message.author.id) return message.channel.send('You can\'t clear your own warnings');

        if(warnings === null) return message.channel.send(`**${user.username}님의 경고가 취소 되었습니다.**`);


        db.delete(`warnings_${message.guild.id}_${user.id}`);

        message.channel.send('경고 최소 완료')
    }
}