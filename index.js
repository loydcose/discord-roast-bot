const Filter = require("bad-words")
const filipinoBadwords = require("filipino-badwords-list")
const { Client, GatewayIntentBits } = require("discord.js")
const { replies } = require("./replies")
const dotenv = require("dotenv")

const filter = new Filter({ list: filipinoBadwords.array })
dotenv.config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
  if (message.author.bot) return
  // console.log("Message: " + message.content)
  if (filter.isProfane(message.content)) {
    const selectedMessage = replies[Math.floor(Math.random() * replies.length)]
    console.log("Curse: " + message.content)
    console.log("Bot: " + selectedMessage)

    message.reply({
      content: selectedMessage,
    })
  }
})

client.login(process.env.DISCORD_BOT_TOKEN_API)
