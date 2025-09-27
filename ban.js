module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  async execute(message, args) {
    if (!message.member.permissions.has('BanMembers'))
      return message.reply('❌ You need permission to ban members.');

    const member = message.mentions.members.first();
    if (!member) return message.reply('❌ Mention a user to ban.');

    if (!member.bannable) return message.reply('❌ I cannot ban that user.');

    await member.ban();
    message.channel.send(`✅ Banned ${member.user.tag}`);
  }
};
