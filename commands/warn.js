const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
  name: "warn",
      aliases: ['경고'],
  description: "Warn a member",

  async run (client, message, args) {
      if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that');

      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

      if(!user) return message.channel.send('경고를 부여할 유저를 맨션해주세요');

      if(user.bot) return message.channel.send('You can\'t warn bots');

      if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

      if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

      let reason = args.slice(1).join(" ");

      if(!reason) reason = 'Unspecified';

      let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

      if(warnings === null) warnings = 1;

      if(warnings === 5) return message.channel.send(`${user}님께서는 5번 경고를 받으셨습니다.\n서버에서 영구밴 처리 됩니다.`);  

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            const warnEmbed = new Discord.MessageEmbed()
            .setAuthor("한 유저가 서버에서 경고가 부여 되었음을 알려드립니다.")
            .setThumbnail(user.displayAvatarURL())
            .setColor(`#FFFFFF`)
            .addField(`경고 부여자`, message.author)
            .addField(`경고 대상`, `${user}`)
            .addField(`경고 횟수`, `${warnings}`)
            .addField(`경고 사유`, reason)
            .setFooter('경고 부여된 시간', client.user.displayAvatarURL())
            .setTimestamp()
            await message.channel.send(warnEmbed)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            const warnEmbed = new Discord.MessageEmbed()
            .setAuthor("한 유저가 서버에서 경고가 부여 되었음을 알려드립니다.")
            .setThumbnail(user.displayAvatarURL())
            .setColor(`#FFFFFF`)
            .addField(`경고 부여자`, message.author)
            .addField(`경고 대상`, `${user}`)
            .addField(`경고 횟수`, `${warnings}`)
            .addField(`경고 사유`, reason)
            .setFooter('경고 부여된 시간', client.user.displayAvatarURL())
            .setTimestamp()
            await message.channel.send(warnEmbed);

        }
    }
}


