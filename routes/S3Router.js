const express = require('express');
const router = express.Router();
const S3Controller = require('../controllers/S3Controller');


router.get('/signedGetObjectUrl', (req, res, next) => S3Controller.signedGetObjectUrl(req, res, next));
router.get('/getObject', (req, res, next) => S3Controller.getObject(req, res, next));
router.get('/getObjectBySignedUrl', (req, res, next) => S3Controller.getObjectBySignedUrl(req, res, next));

router.get('/signedPutObjectUrl', (req, res, next) => S3Controller.signedPutObjectUrl(req, res, next));
router.get('/putObject', (req, res, next) => S3Controller.putObject(req, res, next));
router.get('/putObjectBySignedUrl', (req, res, next) => S3Controller.putObjectBySignedUrl(req, res, next));

router.get('/signedDeleteObjectUrl', (req, res, next) => S3Controller.signedDeleteObjectUrl(req, res, next));
router.get('/deleteObject', (req, res, next) => S3Controller.deleteObject(req, res, next));
router.get('/deleteObjectBySignedUrl', (req, res, next) => S3Controller.deleteObjectBySignedUrl(req, res, next));

module.exports = router;