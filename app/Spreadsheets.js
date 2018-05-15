'use strict';

const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const { promisify } = require('util');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const prompt = require('electron-prompt');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const credentialsPath = path.join(app.getPath('userData'), 'credentials.json');

let mainWindow;
let userAuthRequired = false;
let oAuth2Client;

exports.userAuthRequired = () => {
    return userAuthRequired;
}

exports.init = async (window) => {
    mainWindow = window;
    const credentials = JSON.parse(await readFileAsync('./app/client_secret.json', 'utf-8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

    userAuthRequired = !fs.existsSync(credentialsPath);
    if (userAuthRequired) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        opn(authUrl);
        prompt({
            title: "Google認証",
            label: "認証コードを入力してください",
            alwaysOnTop: true
        }, mainWindow).then((r) => {
            this.setCode(r);
        });
    } else {
        oAuth2Client.setCredentials(JSON.parse(await readFileAsync(credentialsPath, 'utf-8')));
    }
}

exports.setCode = async (code) => {
    oAuth2Client.getToken(code, (err, token) => {
        if (token) {
            oAuth2Client.setCredentials(token);
            fs.writeFileSync(credentialsPath, JSON.stringify(token));
        }
    });
}

exports.submit = async (area, hard, character, blueprint, bpcount, boxtech, callback) => {
    const sheets = google.sheets({ version: 'v4', oAuth2Client });
    const res = await sheets.spreadsheets.values.append(
        {
            auth: oAuth2Client,
            spreadsheetId: '1rTlsLRcEveAwA8-AdE_Slz4h_bje3ceh7628dnv_9rg',
            valueInputOption: 'USER_ENTERED',
            range: "'" + (hard == true ? "H" + area : area) + "'",
            resource: {
                values: [
                    [character, blueprint ? blueprint + '*' + bpcount : null, boxtech],
                ]
            }
        }
    );
    console.log(res);
    callback(res);
}