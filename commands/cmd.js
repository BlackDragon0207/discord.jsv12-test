const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "cmd",
        aliases: ['node'],
    description: "node start",

async run (client, message, args) {

    if(!message.author.id == ['435800525389430804','616570697875193866','690504046905393182']) return message.reply('당신은 개발자가 아닙니다.')

        const input = args.join(' ')
        if(input.length < 1) return message.reply('Text를 적어주세요!')

        // Actual Eval
        try {
            const result = eval(input)

            const embed = new MessageEmbed()
                .setTitle("실행 완료")
                .setDescription(`⌨Input\`\`\`md\n${input}\n\`\`\`\n🖥Output\`\`\`js\n${result}\n\`\`\``)
                
                .setColor(this.client.config.color)
                .setAuthor('Made by 놀욘#0132','https://cdn.discordapp.com/attachments/820186973624074240/852820765887299594/086dbed89b457be2.png')
            message.channel.send(embed)
        } catch (e) {
            console.error(e)
            const embed = new MessageEmbed()
                .setTitle('에러')
                .setDescription(`⌨Input\`\`\`md\n${input}\n\`\`\`\n🖥Output\`\`\`js\n${e.message}\n\`\`\``)
                .setColor('RED')
                .setFooter("Made by. 놀욘#0132", client.user.displayAvatarURL())
               
            return message.channel.send(embed)
        }
