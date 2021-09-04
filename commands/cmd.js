const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const { inspect } = require('util')

module.exports = {
    name: "cmd",
        aliases: ['node'],
    description: "node start",

async run (client, message, args) {
const dev = ['435800525389430804', '616570697875193866']
if(!dev.includes(message.author.id)) return message.reply('당신은 개발자가 아닙니다.');

        const input = args.join(' ')
        if(input.length < 1) return message.reply('Text를 적어주세요!')

        // Actual Eval
        try {
            const evaluated = eval(input)
            const result = inspect(evaluated, { depth: 0 })

            const embed = new Discord.MessageEmbed()
                .setTitle("실행 완료")
                .setDescription(`⌨Input\`\`\`md\n${input}\n\`\`\`\n🖥Output\`\`\`js\n${result}\n\`\`\``)
                
                .setColor('GREEN')
                .setFooter("저작권 소유: 놀욘#0132 comjun04#0001", client.user.displayAvatarURL())
            message.channel.send(embed)
        } catch (e) {
            console.error(e)
            client.channels.cache.get('853231576141529108').send('[ERROR] '+e)
            const embed = new Discord.MessageEmbed()
                .setTitle('에러')
                .setDescription(`⌨Input\`\`\`md\n${input}\n\`\`\`\n🖥Output\`\`\`js\n${e.message}\n\`\`\``)
                .setColor('RED')
                .setFooter("저작권 소유: 놀욘#0132 comjun04#0001", client.user.displayAvatarURL())
            return message.channel.send(embed)
        }
    }
}