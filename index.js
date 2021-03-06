const Discord = require('discord.js');
const fetch = require('node-fetch')
const path = require('path')
const { getEthPriceNow }= require('get-eth-price');
var Datastore = require('nedb');
require('dotenv').config()

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES ] });
const historyDB = new Datastore({ filename: path.join(__dirname, 'history.db'), autoload: true });

function fetchData(callback) {
    fetch('https://api.opensea.io/api/v1/collection/codecats/stats')
        .then(res => res.json())
        .then(json => json.stats)
        .then(jsonStats => {
            console.log("Got stats")
            console.log(jsonStats)

            getEthPriceNow()
                .then( data => {
                    console.log(data)
                    console.log(`Current price of ETH in GBP: £${Object.values(data)[0].ETH.GBP}`)
                    console.log(`Current price of ETH in USD: $${Object.values(data)[0].ETH.USD}`)

                    const currentTime = new Date(Date.now()).toString()
                    const pricePounds = jsonStats.thirty_day_average_price * Object.values(data)[0].ETH.GBP
                    const priceDollars = jsonStats.thirty_day_average_price * Object.values(data)[0].ETH.USD

                    const embed = new Discord.MessageEmbed()
                        .setTitle('CodeCats Stats')
                        .setURL('https://opensea.io/collection/codecats?tab=activity')
                        .setTimestamp(Date.now())
                        .addField("Average Sale Price (30 Days)", jsonStats.thirty_day_average_price.toString() + " ETH", true)
                        .addField("Average Sale Price (30 Days)", pricePounds + " GBP", true)
                        .addField("Average Sale Price (30 Days)", priceDollars + " USD", true)
                        .addField("Number Of Owners", jsonStats.num_owners.toString(), true)
                        .addField("Average Price", jsonStats.average_price + " ETH", true)
                        .addField("Total Sales", jsonStats.total_sales.toString(), true)
                        .addField("Date/Time", currentTime)

                    historyDB.insert({
                        timestamp: Date.now(),
                        price: {
                            eth: jsonStats.thirty_day_average_price,
                            gbp: pricePounds,
                            usd: priceDollars
                        },
                        stats: jsonStats,
                        timestampString: currentTime
                    }, (err, newdoc) => {
                        
                    })

                    callback(embed, jsonStats)
                });
        })
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    console.log(`${message.author.tag} sent message "${message.content}"`)

    if (message.author.id == client.user.id)
        return
    
    if (message.content.toLowerCase() == "!grabstats" || message.content.toLowerCase() == "!grabstats verbose") {
        fetchData((embed, jsonStats) => {
            if (message.content.toLowerCase() == "!grabstats verbose") {
                message.reply("```json\n" + JSON.stringify(jsonStats, null, 2) + "```")
            }
            
            message.reply({ embeds: [ embed ] })
        })
    } else if (message.content.toLowerCase() == "!invite") {
        message.reply(process.env.INVITE_LINK)
    }
});

client.login(process.env.BOT_TOKEN);