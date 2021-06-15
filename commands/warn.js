const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
  name: "warn",
      aliases: ['경고'],
  description: "Warn a member",

  async run (client, message, args) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You can\'t use that');

      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

      if(!user) return message.channel.send('경고를 부여할 유저를 맨션해주세요');

      if(user.bot) return message.channel.send('You can\'t warn bots');

      if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

      if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

      let reason = args.slice(1).join(" ");

      if(!reason) reason = 'Unspecified';

      let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

      if(warnings === null) warnings = 0;

//=======
      if(warnings !== 0){
        setTimeout (() => {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(`#e21717`)
            .setAuthor("경고 부여가 완료 되었습니다")
            .setDescription(`${user.username}님의 이전 경고 | ${warnings}`)
            message.channel.send(warnEmbed)
        }, 1000) 
    } else 
        { 
        setTimeout (() => {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1)
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(`#e21717`)
            .setAuthor("경고 부여가 완료 되었습니다")
            .setDescription(`${user.username}님의 이전 경고 | 0`)
            message.channel.send(warnEmbed)
        }, 1000)
    }

    if(warnings === 3){
        setTimeout (() => {
            db.set(`warnings_${message.guild.id}_${user.id}`, 4)
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(`#e21717`)
            .setDescription(`${user.username}님 앞으로 경고를 한 번 더 받으시면 서버에서 영구 밴 됩니다`)
            message.channel.send(warnEmbed)
        }, 2500)
    }

    //======
      setTimeout (() => {
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            const warnEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}님의 경고 내용`)
            .setThumbnail(user.displayAvatarURL())
            .setColor(`#e21717`)
            .addField(`경고 부여자`, message.author)
            .addField(`경고 대상`, `${user}`)
            .addField(`경고 사유`, reason)
            .setFooter('경고 부여된 시간', client.user.displayAvatarURL())
            .setTimestamp()
            message.channel.send(warnEmbed)
        }, 1500)
        }
    }



