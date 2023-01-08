require('dotenv').config()

const {Client, GatewayIntentBits} = require('discord.js')
const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const {Configuration, OpenAIApi} = require('openai')
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration)

client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;
        const gptRes = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message.content}`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ["ChatGPT:", "CelineFeline:"]
        })
        message.reply(`${gptRes.data.choices[0].text}`)
        return
    } catch (error) {
        console.log(error)
    }
})

client.login(process.env.DISCORD_TOKEN)
console.log("ChatGPT is online on Discord")