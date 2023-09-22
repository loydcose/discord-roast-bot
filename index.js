const Filter = require("bad-words")
const filipinoBadwords = require("filipino-badwords-list")
const filter = new Filter({ list: filipinoBadwords.array })

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
  if (filter.isProfane(message.content)) {
    const selectedMessage = replies[Math.floor(Math.random() * arr.length)]
    console.log("User " + message.content)
    console.log("Bot " + selectedMessage)

    message.reply({
      content: "selectedMessage",
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
