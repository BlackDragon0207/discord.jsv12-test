const Discord = require('discord.js');
const client = new Discord.Client();
const discordButtons = require("discord-buttons-plugin");
const buttonClient = new discordButtons(client)
const { token, default_prefix } = require('./config.json');
const { readdirSync } = require('fs');
const { join } = require('path');
const config = require('./config.json');
client.config = config;
const db = require('quick.db');
const message = [' ']
let current = 1;


client.commands= new Discord.Collection();
//You can change the prefix if you like. It doesn't have to be ! or ;
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}


client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');

    setInterval(() => {
        if(message[current]){
            client.user.setActivity(`BlackDragon Community`, { type: "COMPETING"})
        current++;
        }else{
            current = 0;
            client.user.setActivity(`Community Member | ${client.guilds.cache.get('436048224617365524').members.cache.size}`, { type: "PLAYING"})
        }
    }, 5*1500)
});

client.on("message", (message) => {
	if(message.content === "D_button") { 
	/* Generate a Cute Embed :3 */
	 const embed = new Discord.MessageEmbed() 
	 .setTitle("당신은 이 서버가 좋은 서버라고 생각하시나요?")
	 .setColor("GREEN");
 
    /* Generate 1st Button with "Yes" lable on it */
	 const button1 = new buttonClient.MessageButton()
	 .setLabel("Yes")
	 .setStyle("green")
	 .setID("yes")

   /* Generate 2nd Button with "No" label on it */
	 const button2 = new buttonClient.MessageButton()
	 .setLabel("No")
	 .setStyle("red")
	 .setID("no")

   /* Generate 3rd Link Button */
   const button3 = new buttonClient.MessageButton()
   .setLabel("Join me on OnlyFans")
   .setURL("https://withwin.in/dbd")

     
     /* Send Message with button */
     buttonClient.send(null, { channel: message.channel.id, embed, buttons: [ [button1, button2], [button3] ]})
 }
})


/* Listen to buttons event with their ID */
buttonClient.on("yes", (inta) => inta.message.reply("고마워요! :)"))
buttonClient.on("no", (inta) => {
	inta.message.delete()
	inta.message.reply("더 좋은 서버가 되도록 노력하겠습니다...!!")
})

client.on('guildMemberUpdate', member=>{
    const MemberShip = new Discord.MessageEmbed() //멤버쉽 있음
    .setTitle('흑룡유튜브 멤버십 가입 완료')
    .setColor("#ff7575")
    .setDescription(`\n${member.user.tag}님 멤버십 가입 감사합니다!`)    
    .setThumbnail('https://cdn.discordapp.com/attachments/663692632635080734/864492891514601502/youtube.png')
    .setTimestamp()
    
 const ch = client.channels.cache.get('864491455343099934')
      
 if(!member.roles.cache.get('835092380155772958')) return ch.send(MemberShip) //유튜브 멤버쉽 가입할떄 보내는 메시지
   
})



client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = default_prefix;

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);


    if(prefixRegex.test(message.content)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(token);
