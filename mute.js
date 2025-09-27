module.exports = {
  name: 'mute',
  description: 'Mute a user (add Muted role)',
  async execute(message, args) {
    if (!message.member.permissions.has('ModerateMembers'))
      return message.reply('❌ You need permission to mute members.');

    const member = message.mentions.members.first();
    if (!member) return message.reply('❌ Mention a user to mute.');

    const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
    if (!role) return message.reply('❌ No "Muted" role found. Please create one.');

    await member.roles.add(role);
    message.channel.send(`🔇 Muted ${member.user.tag}`);
  }
};
