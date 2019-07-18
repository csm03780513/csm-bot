var express = require('express')
var app = express()
const TelegramBot = require('node-telegram-bot-api');
var bodyParser = require('body-parser')
const axios = require('axios')
const https = require('https');
const http = require('http');
const fs = require('fs');


app.use(bodyParser.json()) // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true
    })
) // for parsing application/x-www-form-urlencoded


//const privateKey = fs.readFileSync('/etc/letsencrypt/live/li1659-253.members.linode.com/privkey.pem', 'utf8');
//const certificate = fs.readFileSync('/etc/letsencrypt/live/li1659-253.members.linode.com/cert.pem', 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/li1659-253.members.linode.com/chain.pem', 'utf8');
const httpsPort = 8443;
const httpPort = 3000;
const gameUrl = 'https://li1659-253.members.linode.com';
const botToken = '827718327:AAEqBDt4xdlULWUTSYgH04tSEdbUeEgQ1fc';
const game_short_name = 'MathAssault';
const queries = {};
const bot = new TelegramBot(botToken, { polling: true });

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

//This is the route the API will call
app.all('/new-message', function (req, res) {
    const { message } = req.body;
    const gameQuery = req.query;
    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
    console.log(JSON.stringify(message));
    console.log("Game Qry " + JSON.stringify(gameQuery));
    if (message === undefined || message.Length == 0) {
        // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
        console.log("body was empty", JSON.stringify(message))
        return res.end("body was empty");
    }

    // If we've gotten this far, it means that we have received a message containing the word "marco".
    // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
    if (message.text != undefined) {
        if (message.text.toLowerCase().includes('game')) {
            axios
                .post(
                    'https://api.telegram.org/bot' + botToken + '/sendGame',
                    {
                        chat_id: message.chat.id,
                        game_short_name: game_short_name,
                        reply_markup: {
                            inline_keyboard: [[{
                                text: 'Play Now!',
                                callback_game: {
                                    callback_query_id: message.chat.id,
                                    url: gameUrl + "?id=" + message.chat.id,
                                    show_alert: true
                                }
                            }]]
                        }
                    }
                )
                .then(response => {
                    // We get here if the message was successfully posted
                    console.log('Message posted')
                    res.end('ok')
                })
                .catch(err => {
                    // ...and here if it was not
                    console.log('Error :', err)
                    res.end('Error :' + err)
                })
        } else {
            axios
                .post(
                    'https://api.telegram.org/bot' + botToken + '/sendMessage',
                    {
                        chat_id: message.chat.id,
                        text: 'Hello ' + message.chat.first_name + " " + message.chat.last_name + " \u{1F603}" + " \u{1F609}",
                        reply_markup: {
                            inline_keyboard: [[{
                                text: 'Share with your friends',
                                switch_inline_query: 'share'
                            }]]
                        }
                    }
                )
                .then(response => {
                    // We get here if the message was successfully posted
                    console.log('Message posted as expected')
                    res.end('ok')
                })
                .catch(err => {
                    // ...and here if it was not
                    console.log('Error :', err.stack)
                    res.end('Error :' + err.stack)
                })
        }
    }
})

app.get('/', (req, res) => {
    res.send('hello https');
});

/////with telegram library///
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text.toLowerCase().includes('game', 'games')) {
        return bot.sendGame(msg.from.id, game_short_name);
    }
    if (msg.text.toLowerCase().includes('hi', 'hey')) {
        // send a message to the chat acknowledging receipt of their message
        return bot.sendMessage(chatId, 'Hello ' + msg.chat.first_name + ' ' + msg.chat.last_name + '\u{1F603}' + '\u{1F609}');
    } else {
        return bot.sendMessage(chatId, 'MMh \u{1F60F} I am still learning, I offer only games here. say something like->I want to play a game or click-> /play');
    }
});

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "click-> /game if you want to play."));
bot.onText(/start|game|play/, (msg) => bot.sendGame(msg.from.id, game_short_name));

//on play game button pressed
bot.on('callback_query', function (query) {
    if (query.game_short_name !== game_short_name) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
        let gameurl = gameUrl + "?id=" + query.id;
        console.log('2.qry' + JSON.stringify(queries));
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});
// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, () => {
    console.log('HTTP Server running on port::' + httpPort);
});

httpsServer.listen(httpsPort, () => {
    console.log('HTTPS Server running on port::::' + httpsPort);
});