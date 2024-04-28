module.exports = String.prototype.toCapitalize = function () {
  const str = this;
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = `${words[i][0].toUpperCase()}${words[i].substring(1)}`;
  }

  return String(words.join(" "));
};
