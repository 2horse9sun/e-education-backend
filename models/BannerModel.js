const {connectionQuery, poolQuery, promisePool} = require('../databases/MySQLFunction');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {STATUS_CODE} = require('../configs/StatusCode');


const getAllBanners = async () => {
    const statement = `
    SELECT * FROM banner
    `;
    const result = await poolQuery(statement);
    return result;
};


const addBanner = async (bannerTitle, bannerDescription, bannerImageUrl, bannerOrder) => {
    let connection;
    let statement;
    let selectParams;
    let updateParams;
    let result;

    try {
        connection = await promisePool.getConnection();
        await connection.beginTransaction();
    
        statement = `
        SELECT id FROM banner
        WHERE
        banner_order = ?
        `;
        selectParams = [bannerOrder];
        const banners = await connectionQuery(connection, statement, selectParams);
        if(banners.length > 0){
            return new ErrorResponse("Duplicate banner order", STATUS_CODE.DB_DUPLICATE_KEY);
        }
    
        statement = `
        INSERT INTO banner(title, description, image_url, banner_order)
        VALUES(?, ?, ?, ?)
        `;
        updateParams = [bannerTitle, bannerDescription, bannerImageUrl, bannerOrder];
        result = await connectionQuery(connection, statement, updateParams);

        await connection.commit();
    } catch (error) {
        console.log(error);
        // await connection.rollback();
        return new ErrorResponse(error.toString(), STATUS_CODE.DB_ERROR);
    } finally {
        await connection.release();
    }

    return new SuccessResponse(result);
};

// todo
const updateBannerById = async (bannerId, bannerTitle, bannerDescription, bannerImageUrl, bannerOrder) => {
    const statement = `
    UPDATE banner
    SET title = ?, description = ?, image_url = ?, banner_order = ?
    WHERE id = ?
    `;
    const params = [bannerTitle, bannerDescription, bannerImageUrl, bannerOrder, bannerId];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteBannerById = async (bannerId) => {
    const statement = `
    DELETE FROM banner
    WHERE id = ?
    `;
    const params = [bannerId];
    const result = await poolQuery(statement, params);
    return result;
};

module.exports = {
    getAllBanners,
    addBanner,
    updateBannerById,
    deleteBannerById
};