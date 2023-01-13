const S3Function = require('../storages/S3Function');
const fs = require('fs').promises;
const axios = require('axios');
const mime = require('mime-types');


const getObject = async (srcPath, destPath) => {
    const {Body} = await S3Function.getObject(srcPath);
    await fs.writeFile(destPath, Body);
};


const getObjectBySignedUrl = async (url, destPath) => {
    const {data} = await axios({
        url: url,
        method: 'GET',
        responseType: 'stream',
    });
    await fs.writeFile(destPath, data);
};


const putObject = async (srcPath, destPath) => {
    const body = await fs.readFile(srcPath);
    await S3Function.putObject(destPath, body);
};


const putObjectBySignedUrl = async (url, srcPath) => {
    const readStream = await fs.readFile(srcPath);
    await axios({
        url: url,
        method: 'PUT',
        data: readStream,
        headers: {
            "Content-type": mime.lookup(srcPath)
        }
    });
};


const deleteObject = async (objectPath) => {
    await S3Function.deleteObject(objectPath);
};


const deleteObjectBySignedUrl = async (url) => {
    const getObjectBySignedUrlRes = await axios({
        url: url,
        method: 'DELETE'
    });
};

module.exports = {
    getObject,
    getObjectBySignedUrl,
    putObject,
    putObjectBySignedUrl,
    deleteObject,
    deleteObjectBySignedUrl
};