const { Client, GatewayIntentBits, Collection, REST, Routes, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// Load prefix commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Load /help command
const helpCommand = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Show help for all prefix commands by Crayon');

const rest = new REST({ version: '10' }).setToken(config.token);
client.once('ready', async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  // Register the /help command
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: [helpCommand.toJSON()] }
  );

  client.user.setActivity('for /help | prefix: ' + config.prefix);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'help') {
    const helpText = Array.from(client.commands.values())
      .map(cmd => `**${config.prefix}${cmd.name}** - ${cmd.description}`)
      .join('\n');

    await interaction.reply({ content: `📜 **Moderation Bot Commands:**\n\n${helpText}`, ephemeral: true });
  }
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply('❌ An error occurred while executing that command.');
  }
});

client.login(config.token);
