const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

require('dotenv').config({ path: '/opt/settings/.env'})

const app = express()
const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.setWebhook('https://back-end-telegram-node.herokuapp.com')

app
.use(bot.webhookCallback('/'))
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'pug')
.get('/', (req,res) => res.send('Holass!'))
.listen(PORT, () => {
    console.log('Listening en el puerto', PORT)
})

// funcionamiento del bot
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('ok'))
bot.on('entendido?', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.startPolling()