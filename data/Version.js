'use strict';

const path = require('path');
const fs = require('mz/fs');
const crypto = require('crypto');

const json = { data: {} };

let versionUp = false;

const checksum = (data) => {
    return crypto.createHash('sha512').update(data, 'utf8').digest('base64');
}

const pushJson = (dir, obj) => {
    let target = json.data;
    dir.split('/').forEach((line, index, hierarchy) => {
        if (!target[line])
            if (index === hierarchy.length - 1)
                target[line] = [];
            else
                target[line] = {};
        target = target[line];
    });
    target.push(obj);
}

const walk = async (path) => {
    const dir = await fs.readdir(path);
    for (let line of dir) {
        const sub = path + '/' + line;
        const stat = await fs.stat(sub);
        if (stat.isDirectory()) {
            await walk(sub);
        } else {
            const sha512 = checksum(await fs.readFile(sub));
            pushJson(path, {
                name: line,
                size: stat.size,
                integrity: sha512
            });
        }
    }
}

const run = async () => {
    const currentVersion = JSON.parse(await fs.readFile('version.json')).version;

    const dir = await fs.readdir('./');
    for (let line of dir) {
        const stat = await fs.stat(line);
        if (stat.isDirectory())
            await walk(line);
    }

    json.version = currentVersion + 1;
    console.log(currentVersion)
    await fs.writeFile('version.json', JSON.stringify(json));
    console.log('done');
}

run();