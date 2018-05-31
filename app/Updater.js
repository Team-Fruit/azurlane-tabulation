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

const localFiles = [];
const downloadQueue = [];
const deleteQueue = [];

let localVersionData;
let remoteVersionData;
let updateRequire = false;

exports.updateRequired = async () => {
    localFiles.length = 0;
    downloadQueue.length = 0;
    deleteQueue.length = 0;

    if (!await fs.exists(baseDir))
        await fs.mkdir(baseDir);

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
                    obj[key].forEach((line) => array.push(base + key + '/' + line));
                else
                    parse(obj[key], base + key + '/', array);
            });
        }

        const allFiles = [];
        parse(remoteVersionData.data, '/', allFiles);
        if (localVersionData)
            parse(localVersionData.data, '/', localFiles);

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

exports.download = async (onProgress) => {
    for (let line of downloadQueue) {
        const file = path.join(baseDir, line);
        await fse.ensureDir(path.dirname(file));
        const body = await request({
            url: remoteDirUrl + encodeURI(line),
            encoding: null
        });
        await fs.writeFile(file, body, 'binary');
        onProgress();
    }
    downloadQueue.length = 0;
    if (deleteQueue.length === 0)
        await onFinishUpdate();
}

exports.delete = async (onProgress) => {
    for (let line of deleteQueue) {
        const file = path.join(baseDir, line);
        await fs.unlink(file);
        onProgress();
    }
    deleteQueue.length = 0;
    if (downloadQueue.length === 0)
        await onFinishUpdate();
}

const onFinishUpdate = async () => {
    localVersionData = remoteVersionData;
    await fs.writeFile(versionFile, JSON.stringify(localVersionData));
    updateRequire = false;
}