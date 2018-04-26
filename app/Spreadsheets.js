'use strict';

const fs = require('fs');
const { promisify } = require('util');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const sheets = google.sheets('v4');

const readFileAsync = promisify(fs.readFile);

let oauth2Client;

exports.init = async () => {
    const clientSecret = JSON.parse(await readFileAsync('./app/client_secret.json'));
    oauth2Client = new google.auth.OAuth2(
        clientSecret.installed.client_secret,
        clientSecret.installed.client_id,
        clientSecret.installed.redirect_uris[0]
    );
    const credentials = JSON.parse(await readFileAsync('./app/credentials.json'));
    oauth2Client.setCredentials(credentials);
}

exports.submit = async (area, hard, character, blueprint, bpcount, boxtech) => {
    const res = await sheets.spreadsheets.values.append(
        {
            auth: oauth2Client,
            spreadsheetId: '1rTlsLRcEveAwA8-AdE_Slz4h_bje3ceh7628dnv_9rg',
            valueInputOption: 'USER_ENTERED',
            range: "'" + hard ? 'H' + area : area + "'",
            resource: {
                values: [
                    [character, blueprint+'*'+bpcount, boxtech],
                ]
            }
        }
    );
    console.log(res);
}