const {poolQuery} = require('../databases/MySQLFunction');


const getAllTags = async () => {
    const statement = `
    SELECT * FROM tag
    `;
    const result = await poolQuery(statement);
    return result;
};


const putTag = async (tagName) => {
    const statement = `
    REPLACE INTO tag(name)
    VALUES(?)
    `;
    const params = [tagName];
    const result = await poolQuery(statement, params);
    return result;
};


const updateTagByName = async (oldTagName, newTagName) => {
    const statement = `
    UPDATE tag
    SET name=?
    WHERE name=?
    `;
    const params = [newTagName, oldTagName];
    const result = await poolQuery(statement, params);
    return result;
};


const deleteTagByName = async (tagName) => {
    const statement = `
    DELETE FROM tag
    WHERE name=?
    `;
    const params = [tagName];
    const result = await poolQuery(statement, params);
    return result;
};

module.exports = {
    getAllTags,
    putTag,
    updateTagByName,
    deleteTagByName
};