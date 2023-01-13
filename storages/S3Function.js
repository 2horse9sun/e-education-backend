const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {AWS_S3_CONFIG} = require('../configs/StorageConfig');


const client = new S3Client({
    region: AWS_S3_CONFIG.region,
    credentials: {
        accessKeyId: AWS_S3_CONFIG.accessKeyId,
        secretAccessKey: AWS_S3_CONFIG.secretAccessKey
    }
});


const signedGetObjectUrl = async (key, expiresIn = 3600) => {
    const command = new GetObjectCommand({
        Bucket: AWS_S3_CONFIG.bucket,
        Key: key
    });
    const url = await getSignedUrl(client, command, {expiresIn: expiresIn});
    return url;
}


const getObject = async (key) => {
    const result = await client.send(new GetObjectCommand({
        Bucket: AWS_S3_CONFIG.bucket,
        Key: key
    }));
    return result;
};


const signedPutObjectUrl = async (key, expiresIn) => {
    const command = new PutObjectCommand({
        Bucket: AWS_S3_CONFIG.bucket,
        Key: key
    });
    const url = await getSignedUrl(client, command, {expiresIn: expiresIn});
    return url;
}


const putObject = async (key, body) => {
    const result = await client.send(new PutObjectCommand({
        Bucket: AWS_S3_CONFIG.bucket,
        Key: key,
        Body: body
    }));
    return result;
};


const signedDeleteObjectUrl = async (key, expiresIn) => {
    const command = new DeleteObjectCommand({
        Bucket: AWS_S3_CONFIG.bucket,
        Key: key
    });
    const url = await getSignedUrl(client, command, {expiresIn: expiresIn});
    return url;
}


const deleteObject = async (key) => {
    const result = await client.send(new DeleteObjectCommand({
        Bucket: AWS_S3_CONFIG.bucket,
        Key: key
    }));
    return result;
};

module.exports = {
    signedGetObjectUrl,
    getObject,
    signedPutObjectUrl,
    putObject,
    signedDeleteObjectUrl,
    deleteObject
}