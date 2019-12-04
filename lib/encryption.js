// This part is to hash the password
// Resource => https://www.npmjs.com/package/bcrypt

const bcrypt = require('bcrypt');

exports.encrypt = async pass => {
  if (!pass) return '';
  return await bcrypt.hash(pass, 13);
};

exports.compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};