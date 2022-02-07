# CodeCats Bot

---

This is a bot I made to keep track of how much the CodeCats will be when the next batch comes out.


### Running the bot yourself
To run the bot yourself, you need to do a few things.
1. Install [NodeJS](https://nodejs.org/en/) and NPM (should come with NodeJS)
2. Run `npm install` or `npm i` to install the Node modules
3. Copy `.env.emample` to a new file called `.env`
4. Replace `YOUR_TOKEN_HERE` with the token of your Discord Bot
4. Optional: `INVITE_LINK` with the invite link of your Discord Bot
5. Run `node .` or `node index.js` to start the bot!


##### If you want to have the bot run twice a day to store historical data, you must do the following:
1. Fork this repository
2. Replace **YOUR_EMAIL_HERE** in `.github/workflows/no-message.yml` with your github email
3. That's all!

###### If you don't, just delete the `.github` folder!

### Commands
There are only 2 commands for this bot
- `!grabstats`  The normal command that sends a nice embed
- `!grabstats verbose`  Does the same as `!grabstats` but also sends the raw stats JSON
- `!invite`  Sends the link to invite the bot to your server

#### Public Instance
Click [here](https://discord.com/api/oauth2/authorize?client_id=836989800757329940&permissions=277025507328&scope=bot) to invite this bot to your server!

##### If you are looking through the source code, you'll notice I haven't implemented any kind of proper command handling system. The only reason for that is that this is a smaill bot and I didn't feel like it needed it.

<!-- ### Donate
If anyone feels like supporting me, here's my wallet address: `0xc20c95aa3255FBc7bc0F28e3edC7D89088d2Fe8e` -->