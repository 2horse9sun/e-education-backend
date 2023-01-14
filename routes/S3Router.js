const express = require('express');
const router = express.Router();
const S3Controller = require('../controllers/S3Controller');


router.get('/signedGetObjectUrl', S3Controller.signedGetObjectUrl);
router.get('/getObject', S3Controller.getObject);
router.get('/getObjectBySignedUrl', S3Controller.getObjectBySignedUrl);

router.get('/signedPutObjectUrl', S3Controller.signedPutObjectUrl);
router.get('/putObject', S3Controller.putObject);
router.get('/putObjectBySignedUrl', S3Controller.putObjectBySignedUrl);

router.get('/signedDeleteObjectUrl', S3Controller.signedDeleteObjectUrl);
router.get('/deleteObject', S3Controller.deleteObject);
router.get('/deleteObjectBySignedUrl', S3Controller.deleteObjectBySignedUrl);

module.exports = router;