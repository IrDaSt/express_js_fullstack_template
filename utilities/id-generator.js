const uuid = require("uuid");

const generateUUIDV4 = () => uuid.v4();

const idGeneratorUtils = {
  generateUUIDV4,
};

module.exports = idGeneratorUtils;
