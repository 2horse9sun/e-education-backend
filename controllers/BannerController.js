const BannerModel = require('../models/BannerModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getAllBanners = async (req, res, next) => {
    const result = await BannerModel.getAllBanners();
    return res.json(result);
};


const addBanner = async (req, res, next) => {
    let {bannerTitle, bannerDescription, bannerImageUrl, bannerOrder} = req.body;
    const result = await BannerModel.addBanner(bannerTitle, bannerDescription, bannerImageUrl, bannerOrder);
    return res.json(result);
};


const updateBannerById = async (req, res, next) => {
    const {bannerId, bannerTitle, bannerDescription, bannerImageUrl, bannerOrder} = req.body;
    const result = await BannerModel.updateBannerById(bannerId, bannerTitle, bannerDescription, bannerImageUrl, bannerOrder);
    return res.json(result);
};


const deleteBannerById = async (req, res, next) => {
    const {bannerId} = req.query;
    const result = await BannerModel.deleteBannerById(bannerId);
    return res.json(result);
};

module.exports = {
    getAllBanners,
    addBanner,
    updateBannerById,
    deleteBannerById
};