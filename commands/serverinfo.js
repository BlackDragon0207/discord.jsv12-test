const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "serverinfo",
    aliases: ['서버정보'],
    description: "server",

    async run (client, message, args) {

    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const ID = client.emojis.cache.get('777042273350713354')
		const name = client.emojis.cache.get('776772936748630037')
		const owner = client.emojis.cache.get('714091211392155699')
		const ne = client.emojis.cache.get('713349039810281492')
		const ne2 = client.emojis.cache.get('772413074228903956')
		const discord = client.emojis.cache.get('777075390484447252')
		const discord2 = client.emojis.cache.get('775708755664961556')
		const roles1 = client.emojis.cache.get('852175098453819412')

		const embed = new Discord.MessageEmbed()
			.setDescription(`**__${message.guild.name}__**서버 스테이터스`)
			.setColor('#0c0c0c')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setDescription(`${name} **서버 이름 [ Server Name ]** : **${message.guild.name}**\n
			${ID} **서버 아이디 [ Server ID ]** : ${message.guild.id}\n
			${owner} **서버 운영자 [ Server Owner ]** : ${message.guild.owner.user.tag} (${message.guild.ownerID})\n
			🌍 **지역 [ Region ]** : ${message.guild.region}\n
			${ne} **부스트 티어 [ Boost Tier ]** : ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}\n
			📑 **역할 갯수 [ Role Count ]** : ${roles.length}개\n
			📖 **이모지 갯수 [ Emoji Count ]** : ${emojis.size}개\n
			${discord} **일반 이모티콘 [ Regular Emoji Count ]** : ${emojis.filter(emoji => !emoji.animated).size}개\n
			${discord2} **움직이는 이모티콘 [ Animated Emoji Count ]** : ${emojis.filter(emoji => emoji.animated).size}개\n
			👥 **서버 멤버 [ Member Count ]** : ${message.guild.memberCount}명\n
			💬 **채팅 채널 [ Text Channels ]** : ${channels.filter(channel => channel.type === 'text').size}개\n
			🔊 **음성 채널 [ Voice Channels ]** : ${channels.filter(channel => channel.type === 'voice').size}개\n
			${ne2} **부스트 갯수 [ Boost Count ]** : ${message.guild.premiumSubscriptionCount || '0'}개`)
			.setFooter('스테이터스 확인 시간', client.user.displayAvatarURL())
			.setTimestamp();
		message.channel.send(embed);
    }
}
