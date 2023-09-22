const Filter = require("bad-words")
const filter = new Filter()

const dotenv = require("dotenv")
dotenv.config()

const { Client, GatewayIntentBits } = require("discord.js")
const { replies } = require("./replies")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

// console.log(process.env.DISCORD_BOT_TOKEN_API)

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

// Respond to messages
client.on("message", (message) => {
  try {
    if (message.author.bot) return

    // Check if the message starts with "hello"
    if (message.content.toLowerCase() === "hello") {
      console.log(message.content)
      message.reply("Hello, world!")
    }
  } catch (error) {
    console.error("Error handling message:", error)
  }
})

client.on("messageCreate", (message) => {
  if (message.author.bot) return
  console.log(message.content)
  if (filter.isProfane(message.content)) {
    message.reply({
      content: "Bawal dito mag mura tanginah mo",
    })
  }

  // const selectedMessage =
  //   replies[Math.floor(Math.random() * replies.length - 1)] || "bonak"

  // message.reply({
  //   content: selectedMessage,
  // })
})

// Login to Discord with your app's token
client.login(process.env.DISCORD_BOT_TOKEN_API)