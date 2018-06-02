'use strict';

const { app, shell } = require('electron');
const fs = require('mz/fs');
const path = require('path');
const { google } = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const prompt = require('electron-prompt');

const credentialsPath = path.join(app.getPath('userData'), 'credentials.json');
const rangeReg = /\d+/;
const sheetIds = new Map();

const gold = {
    red: 1,
    green: 0.851,
    blue: 0.4
}
const purple = {
    red: 0.5569,
    green: 0.4863,
    blue: 0.7686
}
const blue = {
    red: 0.4275,
    green: 0.6235,
    blue: 0.9216
}
const colors = {
    gold,
    ssr: gold,
    3: gold,
    purple,
    sr: purple,
    2: purple,
    blue,
    r: blue,
    1: blue
};

let mainWindow;
let oAuth2Client;

exports.init = async (window) => {
    mainWindow = window;
    const credentials = JSON.parse(await fs.readFile(path.join(__dirname, '../resources/client_secret.json')));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

    if (!await fs.exists(credentialsPath)) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        shell.openExternal(authUrl);
        this.setCode(await prompt({
            title: "Google認証",
            label: "認証コードを入力してください",
            alwaysOnTop: true
        }));
    } else {
        oAuth2Client.setCredentials(JSON.parse(await fs.readFile(credentialsPath)));
        fetchSheetIds();
    }
}

exports.setCode = (code) => {
    oAuth2Client.getToken(code, async (err, token) => {
        if (token) {
            oAuth2Client.setCredentials(token);
            await fs.writeFile(credentialsPath, JSON.stringify(token));
            await fetchSheetIds();
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