const generatePlaceholders = (obj) => {
  const keys = Object.keys(obj);
  return keys.map(() => "?").join(", ");
};

module.exports = {
  generatePlaceholders,
};
