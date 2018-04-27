'use strict';

const fs = require('fs');
const { promisify } = require('util');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;

const readFileAsync = promisify(fs.readFile);

let oAuth2Client;

exports.init = async () => {
    const credentials = JSON.parse(await readFileAsync('./app/client_secret.json', 'utf-8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(JSON.parse(await readFileAsync('./app/credentials.json', 'utf-8')));
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