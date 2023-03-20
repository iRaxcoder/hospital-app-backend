const isDate = (value) => {
  if (!value) return false;

  const timestamp = Date.parse(value);

  return isNaN(timestamp) === false;
};

module.exports = {
  isDate,
};
