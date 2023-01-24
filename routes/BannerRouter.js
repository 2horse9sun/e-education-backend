const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/BannerController');


router.get('/getAllBanners', BannerController.getAllBanners);

router.post('/addBanner', BannerController.addBanner);

router.put('/updateBannerById', BannerController.updateBannerById);

router.delete('/deleteBannerById', BannerController.deleteBannerById);


module.exports = router;