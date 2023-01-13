const AWS_S3_CONFIG = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET
};

 
const USER_AVATAR_BASE_DIR = "user/avatar/";
const AWS_S3_DIR = {
    userAvatarDir: (email) => `${USER_AVATAR_BASE_DIR}${email}/` 

};

module.exports = {
    AWS_S3_CONFIG,
    AWS_S3_DIR
};