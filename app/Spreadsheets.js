'use strict';

const { app, shell } = require('electron');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const prompt = require('electron-prompt');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const credentialsPath = path.join(app.getPath('userData'), 'credentials.json');
const rangeReg = /\d+/;
const sheetIds = new Map();
const colors = {
    gold: {
        red: 1,
        green: 0.851,
        blue: 0.4
    },
    purple: {
        red: 0.5569,
        green: 0.4863,
        blue: 0.7686
    },
    blue: {
        red: 0.4275,
        green: 0.6235,
        blue: 0.9216
    },
    ssr: {
        red: 1,
        green: 0.851,
        blue: 0.4
    },
    sr: {
        red: 0.5569,
        green: 0.4863,
        blue: 0.7686
    },
    r: {
        red: 0.4275,
        green: 0.6235,
        blue: 0.9216
    },
    3: {
        red: 1,
        green: 0.851,
        blue: 0.4
    },
    2: {
        red: 0.5569,
        green: 0.4863,
        blue: 0.7686
    },
    1: {
        red: 0.4275,
        green: 0.6235,
        blue: 0.9216
    },
};

let mainWindow;
let oAuth2Client;

exports.init = async (window) => {
    mainWindow = window;
    const credentials = JSON.parse(await readFileAsync(path.join(__dirname, '../resources/client_secret.json'), 'utf-8'));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

    const userAuthRequired = !fs.existsSync(credentialsPath);
    if (userAuthRequired) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        shell.openExternal(authUrl);
        prompt({
            title: "Google認証",
            label: "認証コードを入力してください",
            alwaysOnTop: true
        }).then((r) => {
            this.setCode(r);
        });
    } else {
        oAuth2Client.setCredentials(JSON.parse(await readFileAsync(credentialsPath, 'utf-8')));
        fetchSheetIds();
    }
}

exports.setCode = async (code) => {
    oAuth2Client.getToken(code, (err, token) => {
        if (token) {
            oAuth2Client.setCredentials(token);
            fs.writeFileSync(credentialsPath, JSON.stringify(token));
            fetchSheetIds();
        }
    });
}

const fetchSheetIds = async () => {
    const sheets = google.sheets({ version: 'v4', oAuth2Client });
    await sheets.spreadsheets.get(
        {
            auth: oAuth2Client,
            spreadsheetId: '1rTlsLRcEveAwA8-AdE_Slz4h_bje3ceh7628dnv_9rg',
            includeGridData: false
        },
        (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            res.data.sheets.forEach((line) => {
                sheetIds.set(line.properties.title, line.properties.sheetId);
            });
        }
    );
}

exports.submit = async (data, callback) => {
    const sheets = google.sheets({ version: 'v4', oAuth2Client });
    await sheets.spreadsheets.values.append(
        {
            auth: oAuth2Client,
            spreadsheetId: '1rTlsLRcEveAwA8-AdE_Slz4h_bje3ceh7628dnv_9rg',
            valueInputOption: 'USER_ENTERED',
            range: "'" + (data.hard == true ? "H" + data.area : data.area) + "'",
            resource: {
                values: [
                    [
                        null,
                        data.character.name,
                        data.blueprint.name ? data.blueprint.count > 1 ? data.blueprint.name + '*' + data.blueprint.count : data.blueprint.name : null,
                        data.boxtech,
                        data.retrofit1,
                        data.retrofit2
                    ],
                ]
            }
        },
        async (err, res) => {
            if (err) {
                callback(err);
                return;
            }
            if (data.character.rarity === 'n') {
                callback(res);
                return;
            }

            const updates = res.data.updates;
            const row = updates.updatedRange.split("'!")[1].match(rangeReg)[0];
            await sheets.spreadsheets.batchUpdate(
                {
                    auth: oAuth2Client,
                    spreadsheetId: '1rTlsLRcEveAwA8-AdE_Slz4h_bje3ceh7628dnv_9rg',
                    resource: {
                        requests: [
                            {
                                repeatCell: {
                                    range: {
                                        sheetId: sheetIds.get(data.hard == true ? "H" + data.area : data.area),
                                        startRowIndex: row - 1,
                                        endRowIndex: row,
                                        startColumnIndex: 1,
                                        endColumnIndex: 2
                                    },
                                    cell: {
                                        userEnteredFormat: {
                                            backgroundColor: colors[data.character.rarity]
                                        },
                                    },
                                    fields: "userEnteredFormat(backgroundColor)"
                                }
                            },
                            {
                                repeatCell: {
                                    range: {
                                        sheetId: sheetIds.get(data.hard == true ? "H" + data.area : data.area),
                                        startRowIndex: row - 1,
                                        endRowIndex: row,
                                        startColumnIndex: 2,
                                        endColumnIndex: 3
                                    },
                                    cell: {
                                        userEnteredFormat: {
                                            backgroundColor: colors[data.blueprint.rarity]
                                        },
                                    },
                                    fields: "userEnteredFormat(backgroundColor)"
                                },
                            },
                            {
                                repeatCell: {
                                    range: {
                                        sheetId: sheetIds.get(data.hard == true ? "H" + data.area : data.area),
                                        startRowIndex: row - 1,
                                        endRowIndex: row,
                                        startColumnIndex: 4,
                                        endColumnIndex: 5
                                    },
                                    cell: {
                                        userEnteredFormat: {
                                            backgroundColor: colors[data.retrofit1]
                                        },
                                    },
                                    fields: "userEnteredFormat(backgroundColor)"
                                },
                            },
                            {
                                repeatCell: {
                                    range: {
                                        sheetId: sheetIds.get(data.hard == true ? "H" + data.area : data.area),
                                        startRowIndex: row - 1,
                                        endRowIndex: row,
                                        startColumnIndex: 5,
                                        endColumnIndex: 6
                                    },
                                    cell: {
                                        userEnteredFormat: {
                                            backgroundColor: colors[data.retrofit2]
                                        },
                                    },
                                    fields: "userEnteredFormat(backgroundColor)"
                                },
                            }
                        ]
                    }
                }, (err, res) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                    callback(res);
                }
            );
        }
    );
}