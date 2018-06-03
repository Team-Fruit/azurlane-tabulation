'use strict';

const { app } = require('electron');
const path = require('path');
const request = require('request-promise-native');
const fs = require('mz/fs');
const fse = require('fs-extra');

const baseDir = path.join(app.getPath('userData'), 'data');
const versionFile = path.join(baseDir, 'version.json');
const remoteDirUrl = 'https://raw.githubusercontent.com/Team-Fruit/azurlane-tabulation/master/data';
const versionFileUrl = 'https://raw.githubusercontent.com/Team-Fruit/azurlane-tabulation/master/data/version.json'

const downloadQueue = [];
const deleteQueue = [];

let localFiles = {};
let localVersionData;
let remoteVersionData;
let updateRequire = false;

const checksum = (data) => {
    return crypto.createHash('sha512').update(data, 'utf8').digest('base64');
}

exports.updateRequired = async () => {
    localFiles ={};
    downloadQueue.length = 0;
    deleteQueue.length = 0;

    await fse.ensureDir(baseDir);

    remoteVersionData = await request({
        url: versionFileUrl,
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
                    obj[key].forEach((line) => array[base + key + '/' + line.name] = line);
                else
                    parse(obj[key], base + key + '/', array);
            });
        }

        const allFiles = {};
        parse(remoteVersionData.data, '/', allFiles);
        if (localVersionData)
            parse(localVersionData.data, '/', localFiles);

        Object.keys(allFiles).forEach((line) => {
            if (!localFiles[line] || (allFiles[line].integrity !== localFiles[line].integrity))
                downloadQueue.push(line);
        });
        Object.keys(localFiles).forEach((line) => {
            if (localFiles[line] && !allFiles[line])
                deleteQueue.push(line);
        });
        updateRequire = updateRequire || deleteQueue.length === 0;
    }
    return updateRequire;
}

exports.getDownloadAmount = () => {
    return downloadQueue.length;
}

exports.downloadRequired = () => {
    return this.getDownloadAmount() !== 0;
}

exports.getDeleteAmount = () => {
    return deleteQueue.length;
}

exports.deleteRequired = () => {
    return this.getDeleteAmount() !== 0;
}

const downloadTask = async (line, onProgress) => {
    const file = path.join(baseDir, line);
    await fse.ensureDir(path.dirname(file));
    const body = await request({
        url: remoteDirUrl + encodeURI(line),
        encoding: null
    });
    await fs.writeFile(file, body, 'binary');
    onProgress();
}

exports.download = async (onProgress) => {
    await Promise.all(downloadQueue.map(line => downloadTask(line, onProgress)));
    downloadQueue.length = 0;
    if (deleteQueue.length === 0)
        await onFinishUpdate();
}

const deleteTask = async (line, onProgress) => {
    const file = path.join(baseDir, line);
    await fs.unlink(file);
    onProgress();
}

exports.delete = async (onProgress) => {
    await Promise.all(deleteQueue.map(line => deleteTask(line, onProgress)));
    deleteQueue.length = 0;
    if (downloadQueue.length === 0)
        await onFinishUpdate();
}

const onFinishUpdate = async () => {
    localVersionData = remoteVersionData;
    await fs.writeFile(versionFile, JSON.stringify(localVersionData));
    updateRequire = false;
}