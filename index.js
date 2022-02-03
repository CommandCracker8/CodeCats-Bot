// const fetch = require('node-fetch')

// fetch('https://api.opensea.io/api/v1/collection/codecats/stats')
//     .then(res => res.json())
//     .then(json => json.stats)
//     .then(json => {
//         console.log(json)
// })

const Discord = require('discord.js');
const fetch = require('node-fetch')
const path = require('path')
const { getEthPriceNow }= require('get-eth-price');
var Datastore = require('nedb');
const { exit } = require('process');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const historyDB = new Datastore({ filename: path.join(__dirname, 'history.db'), autoload: true });
const usersToNotifyDB = new Datastore({ filename: path.join(__dirname, 'users.db'), autoload: true });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(() => {
        fetch('https://api.opensea.io/api/v1/collection/codecats/stats')
            .then(res => res.json())
            .then(json => json.stats)
            .then(jsonStats => {
                console.log("Got stats")
                console.log(jsonStats)

                getEthPriceNow()
                    .then( data => {
                        console.log(Object.values(data)[0].ETH.GBP)

                        const timeString = new Date(Date.now()).toString()
                        const costPounds = jsonStats.thirty_day_average_price * Object.values(data)[0].ETH.GBP

                        const embed = new Discord.MessageEmbed()
                            .setTitle('CodeCats Stats')
                            .setURL('https://opensea.io/collection/codecats?tab=activity')
                            .setTimestamp(Date.now())
                            .addField("Average Sale Price (30 Days)", jsonStats.thirty_day_average_price.toString() + " ETH", true)
                            .addField("Average Sale Price (30 Days)", costPounds + " GBP", true)
                            .addField("Number Of Owners", jsonStats.num_owners.toString(), true)
                            .addField("Average Price", jsonStats.average_price + " ETH", true)
                            .addField("Total Sales", jsonStats.total_sales.toString(), true)
                            .addField("Date/Time", timeString)

                        historyDB.insert({
                            timestamp: Date.now(),
                            price: {
                                eth: jsonStats.thirty_day_average_price,
                                gbp: costPounds
                            },
                            stats: jsonStats,
                            timestampString: timeString
                        }, (err, newdoc) => {
                            
                        })
                        
                        client.users.fetch('703303356361212014', false).then((user) => {
                            user.send({ embeds: [ embed ] }).then(message => {
                                // exit(0)
                            })
                        });
                    });
            })
    }, 10000)
});

client.on('message', message => {
    console.log(`${message.author.tag} sent message "${message.content}"`)
});

client.login('ODM2OTg5ODAwNzU3MzI5OTQw.YImBfw.x0jkvI9XoYM-k3Fpig48LaHP0lg');