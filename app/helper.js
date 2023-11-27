function isConvertibleToDate(text) {
    return !isNaN(Date.parse(text));
  }

function isMilliseconds(text) {
    return !isNaN(text) && text.endsWith("000");
}

module.exports = {
    isConvertibleToDate,
    isMilliseconds
}