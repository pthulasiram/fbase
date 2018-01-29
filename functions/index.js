const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');
const url = require('url');
const app = express();
const bodyParser = require('body-parser');
const translate = require('google-translate-api');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// You might instead set these as environment varibles
// I just want to make this example explicitly clear
const appUrl = 'https://janasenaparty.co.in';
const renderUrl = 'https://render-tron.appspot.com/render';
//const renderUrl = 'https://instafire-app.appspot.com/render';


// Generates the URL 
function generateUrl(request) {
    return url.format({
        protocol: request.protocol,
        host: appUrl,
        pathname: request.originalUrl
    });
}

function detectBot(userAgent) {
    // List of bots to target, add more if you'd like

    const bots = [
        // crawler bots
        'googlebot',
        'bingbot',
        'yandexbot',
        'duckduckbot',
        'slurp',
        // link bots
        'twitterbot',
        'facebookexternalhit',
        'linkedinbot',
        'embedly',
        'baiduspider',
        'pinterest',
        'slackbot',
        'vkShare',
        'facebot',
        'outbrain',
        'W3C_Validator'
    ]

    const agent = userAgent.toLowerCase()

    for (const bot of bots) {
        if (agent.indexOf(bot) > -1) {
            console.log('bot detected', bot, agent)
            return true
        }
    }

    console.log('no bots found')
    return false

}

app.post('/translate', (req, res) => {

    translate(req.body.data, { to: req.body.lang }).then(res => {
        console.log(res.text);
        //=> I speak English
        console.log(res.from.language.iso);
        //=> nl
        res.json({ data: res.text });
    }).catch(err => {
        console.error(err);
    });

});
app.get('*', (req, res) => {


    const isBot = detectBot(req.headers['user-agent']);


    if (isBot) {

        const botUrl = generateUrl(req);
        // If Bot, fetch url via rendertron

        fetch(`${renderUrl}/${botUrl}`)
            .then(res => res.text())
            .then(body => {

                // Set the Vary header to cache the user agent, based on code from:
                // https://github.com/justinribeiro/pwa-firebase-functions-botrender
                res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
                res.set('Vary', 'User-Agent');

                res.send(body.toString())

            });

    } else {


        // Not a bot, fetch the regular Angular app
        // Possibly faster to serve directly from from the functions directory? 
        fetch(`https://${appUrl}`)
            .then(res => res.text())
            .then(body => {
                res.send(body.toString());
            })
    }

});

exports.app = functions.https.onRequest(app);