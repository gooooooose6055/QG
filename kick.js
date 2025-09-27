module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  async execute(message, args) {
    if (!message.member.permissions.has('KickMembers'))
      return message.reply('❌ You need permission to kick members.');

    const member = message.mentions.members.first();
    if (!member) return message.reply('❌ Mention a user to kick.');

    if (!member.kickable) return message.reply('❌ I cannot kick that user.');

    await member.kick();
    message.channel.send(`✅ Kicked ${member.user.tag}`);
  }
};
