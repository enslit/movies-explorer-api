const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const urlRegExp = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+/i;
const linkImageRegExp = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg|jpeg)/i;
const textRuRegExp = /^[а-яА-ЯёЁ0-9-.,?!%&@$()+=\s]+$/i;
const textEnRegExp = /^[a-zA-Z0-9-.,?!%&@$()+=\s]+$/i;

module.exports = {
  emailRegExp, urlRegExp, linkImageRegExp, textEnRegExp, textRuRegExp
};
