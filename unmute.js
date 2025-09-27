module.exports = {
  name: 'unmute',
  description: 'Unmute a user (remove Muted role)',
  async execute(message, args) {
    if (!message.member.permissions.has('ModerateMembers'))
      return message.reply('❌ You need permission to unmute members.');

    const member = message.mentions.members.first();
    if (!member) return message.reply('❌ Mention a user to unmute.');

    const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
    if (!role) return message.reply('❌ No "Muted" role found.');

    await member.roles.remove(role);
    message.channel.send(`🔈 Unmuted ${member.user.tag}`);
  }
};
