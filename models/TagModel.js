const {poolQuery} = require('../databases/MySQLFunction');


const getAllTags = async () => {
    const statement = `
    SELECT * FROM tag
    `;
    const allTagsRes = await poolQuery(statement);
    return allTagsRes;
};


const putTag = async (tagName) => {
    const statement = `
    REPLACE INTO tag(name)
    VALUES(?)
    `;
    const params = [tagName];
    const putTagRes = await poolQuery(statement, params);
    return putTagRes;
};


const updateTagByName = async (oldTagName, newTagName) => {
    const statement = `
    UPDATE tag
    SET name=?
    WHERE name=?
    `;
    const params = [newTagName, oldTagName];
    const updateTagByNameRes = await poolQuery(statement, params);
    return updateTagByNameRes;
};


const deleteTagByName = async (tagName) => {
    const statement = `
    DELETE FROM tag
    WHERE name=?
    `;
    const params = [tagName];
    const deleteTagRes = await poolQuery(statement, params);
    return deleteTagRes;
};

module.exports = {
    getAllTags,
    putTag,
    updateTagByName,
    deleteTagByName
};