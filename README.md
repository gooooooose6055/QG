# Moderation Bot

A simple Discord moderation bot using prefix commands and one slash command `/help`.

## 🧾 Features

- `.kick` — Kick users
- `.ban` — Ban users
- `.mute` — Assigns a `Muted` role
- `.unmute` — Removes the `Muted` role
- `/help` — Slash command to list all available prefix commands

---

## ⚙️ Setup

### 1. Clone or Download the Project

If you haven't already:

```
git clone https://github.com/yourusername/moderation-bot.git
cd moderation-bot
```

Or extract the `.zip` you downloaded here.

---

### 2. Install Dependencies

Make sure you have Node.js installed, then run:

```
npm install discord.js
```

---

### 3. Configure the Bot

Open the `config.json` file and replace:

```json
{
  "token": "YOUR_BOT_TOKEN_HERE",
  "prefix": "."
}
```

With your actual bot token and preferred prefix.

---

### 4. Create Muted Role (for mute/unmute)

Manually create a role called `Muted` in your server and make sure it has the correct permissions disabled (like sending messages).

---

### 5. Run the Bot

```
node index.js
```

---

### ✅ Permissions Needed

Make sure your bot has the following permissions:

- Kick Members
- Ban Members
- Manage Roles (for mute/unmute)
- Send Messages
- Read Message History

---

## 📌 Notes

- The bot only has one slash command: `/help`
- All other commands use the prefix defined in `config.json` (default is `.`)
- You can add more commands by placing new files in the `commands/` directory

---

## 🛠 Built with

- [discord.js v14](https://discord.js.org/)

---

**Made by Crayon**
Support server: https://discord.gg/reXktWNq3Y

Happy moderating!
