'use strict';

const { app } = require('electron');
const path = require('path');
const Promise = require('Promise')
const request = require('request-promise-native');
const fs = require('mz/fs');
const fse = require('fs-extra');

const baseDir = path.join(app.getPath('userData'), 'data');
const versionFile = path.join(baseDir, 'version.json');
const remoteDirUrl = 'https://raw.githubusercontent.com/Team-Fruit/azurlane-tabulation/remote-resources/data';
const versionFileUrl = 'https://raw.githubusercontent.com/Team-Fruit/azurlane-tabulation/remote-resources/data/version.json'

const localFiles = [];
const downloadQueue = [];
const deleteQueue = [];

let localVersionData;
let remoteVersionData;
let updateRequire = false;

exports.updateRequired = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await fs.exists(baseDir))
                await fs.mkdir(baseDir);

            remoteVersionData = await request({
                uri: versionFileUrl,
                json: true
            });

            if (await fs.exists(versionFile)) {
                localVersionData = JSON.parse(await fs.readFile(versionFile));
                updateRequire = remoteVersionData.version > localVersionData.version;
            } else
                updateRequire = true;

            if (updateRequire) {
                const parse = (obj, base, array) => {
                    Object.keys(obj).forEach((key) => {
                        if (Array.isArray(obj[key]))
                            obj[key].forEach((line) => array.push(base + key + '/' + line));
                        else
                            parse(obj[key], base + key + '/', array);
                    });
                }

                const allFiles = [];
                parse(remoteVersionData.data, '/', allFiles);
                if (localVersionData)
                    parse(localVersionData.data, '/', localFiles);
                else
                    Array.prototype.push.apply(downloadQueue, allFiles);

                allFiles.forEach((line) => {
                    if (!localFiles.includes(line))
                        downloadQueue.push(line);
                });
                localFiles.forEach((line) => {
                    if (!allFiles.includes(line))
                        deleteQueue.push(line);
                });

                updateRequire = updateRequire || deleteQueue.length === 0;
            }
            resolve(updateRequire);
        } catch (err) {
            reject(err);
        }
    });
}

exports.getDownloadAmount = () => {
    return downloadQueue.length;
}

exports.downloadRequired = () => {
    return getDownloadAmount !== 0;
}

exports.getDeleteAmount = () => {
    return deleteQueue.length;
}

exports.deleteRequired = () => {
    return getDeleteAmount !== 0;
}

exports.download = async (onProgress) => {
    return new Promise((resolve, reject) => {
        try {
            downloadQueue.forEach(async (line) => {
                const file = path.join(baseDir, line);
                await fse.ensureDir(path.dirname(file));
                await request({
                    uri: remoteDirUrl + line,
                    encoding: null
                })
                .pipe(await fs.createWriteStream(file))
                .on('close', onProgress);
            });
            resolve();
        } catch (err) {
            // reject(err);
        }
    });
}