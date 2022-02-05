# CodeCats Bot

---

This is a bot I made to keep track of how much the CodeCats will be when the next batch comes out.


### Running the bot yourself
To run the bot yourself, you need to do a few things.
1. Install [NodeJS](https://nodejs.org/en/) and NPM (should come with NodeJS)
2. Run `npm install` or `npm i` to install the Node modules
3. Copy `.env.emample` to a new file called `.env`
4. Replace `YOUR_TOKEN_HERE` with the token of your Discord Bot
5. Run `node .` or `node index.js` to start the bot!


##### If you want to have the bot send you a message and also run twice a day to store historical data, you must do the following:
1. Fork this repository
2. Replace **YOUR_EMAIL_HERE** in `.github/workflows/message.yml` and `.github/workflows/no-message.yml` with your github email
3. That's all!

###### If you don't, just delete the `.github` folder!