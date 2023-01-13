const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {loginVerification} = require('../middlewares/AuthenticationMiddleware');


router.get('/checkIfEmailExists', (req, res, next) => UserController.checkIfEmailExists(req, res, next));

router.get('/getUserProfileInfoById', (req, res, next) => UserController.getUserProfileInfoById(req, res, next));
router.get('/getMyUserProfileInfo', loginVerification, (req, res, next) => UserController.getMyUserProfileInfo(req, res, next));

router.put('/updateUserProfileInfoById', (req, res, next) => UserController.updateUserProfileInfoById(req, res, next));
router.put('/updateMyUserProfileInfo', loginVerification, (req, res, next) => UserController.updateMyUserProfileInfo(req, res, next));

router.put('/updateUserAvatarById', (req, res, next) => UserController.updateUserAvatarById(req, res, next));
router.put('/updateMyUserAvatar', loginVerification, (req, res, next) => UserController.updateMyUserAvatar(req, res, next));

router.post('/userRegister', (req, res, next) => UserController.userRegister(req, res, next));
router.post('/userLogin', (req, res, next) => UserController.userLogin(req, res, next));


module.exports = router;