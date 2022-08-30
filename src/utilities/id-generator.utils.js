const uuid = require("uuid");

const generateUUIDV4 = () => uuid.v4();

const nextId = ({ id_lama, prefix_length }) => {
  const prefix = id_lama.substring(0, Number(prefix_length));
  const angka_str = id_lama.substring(Number(prefix_length), id_lama.length);
  const angka_plus_str = (Number(angka_str) + 1)
    .toString()
    .padStart(angka_str.length, "0");
  return prefix + angka_plus_str;
};

const idGeneratorUtils = {
  generateUUIDV4,
  nextId,
};

module.exports = idGeneratorUtils;
