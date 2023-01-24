const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {loginVerification} = require('../middlewares/AuthenticationMiddleware');


router.get('/checkIfEmailExists', UserController.checkIfEmailExists);
router.get('/getUserProfileInfoById', UserController.getUserProfileInfoById);
router.get('/getMyUserProfileInfo', loginVerification, UserController.getMyUserProfileInfo);
router.get('/getMentorList', UserController.getMentorList);
router.get('/getMentorProfileInfoById', UserController.getMentorProfileInfoById);
router.get('/getStudentListByMentorId', UserController.getStudentListByMentorId);


router.post('/userRegister', UserController.userRegister);
router.post('/userLogin', UserController.userLogin);

router.put('/updateUserProfileInfoById', UserController.updateUserProfileInfoById);
router.put('/updateMyUserProfileInfo', loginVerification, UserController.updateMyUserProfileInfo);
router.put('/updateUserAvatarById', UserController.updateUserAvatarById);
router.put('/updateMyUserAvatar', loginVerification, UserController.updateMyUserAvatar);
router.put('/updateMyPassword', loginVerification, UserController.updateMyPassword);




module.exports = router;