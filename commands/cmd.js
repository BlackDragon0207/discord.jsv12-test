const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "cmd",
        aliases: ['node'],
    description: "node start",

async run (client, message, args) {

    if(!message.author.id == ['435800525389430804','616570697875193866','690504046905393182']) return message.reply('당신은 개발자가 아닙니다.')
    if(!args) return message.channel.send('관리자님, Text를 적어주세요!')
const Eval = new Discord.MessageEmbed()
.setTitle("cmd 실행 완료")
.setDescription('```md\n# '+args.join(' ')+'\n```\n\n'+'```js\n'+eval(args.join(' '))+'```')
.setFooter(message.author.tag,message.author.displayAvatarURL())
message.channel.send(Eval)
  }
}
