const Discord = require('discord.js');

module.exports = {
    name: "restart",
    aliases: ['재시작'],
    category: "owner",

    run: async (client, message, args) => {
        if (message.author.id !== '435800525389430804') return message.channel.send(`You cannot use this command!`)
        try {
            const dmEmbed = new Discord.MessageEmbed()
            .setTitle('데이터 베이스 저장')
            .setColor("GREEN")
            .setTimestamp()
            .setDescription(`**데이터 저장을 위해 봇이 재부팅 됩니다!**`)
            
            const DMC = client.channels.cache.get('868114761060077568')
            DMC.send(dmEmbed)

            setTimeout(() => {
                const dmEmbed = new Discord.MessageEmbed()
                .setTitle('데이터 베이스 저장')
                .setColor("GREEN")
                .setTimestamp()
                .setDescription(`**데이터 저장을 위해 봇이 재부팅 됩니다!**`)
                
                const DMC2 = client.channels.cache.get('769848064273809408')
                DMC2.send(dmEmbed)
            }, 500)
            setTimeout(() => {
                process.exit()
            }, 1000)
        } catch (e) {
            console.log(e.message)
        }
    }}