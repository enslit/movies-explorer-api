const isEmail = (v) =>
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g.test(
    v.toLowerCase()
  );

const isLinkImage = (v) =>
  /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg)/gi.test(v);

const isUrl = (v) =>
  /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+/gi.test(v);

const isCyrillicText = (v) => /^[а-яА-ЯёЁ0-9-.,?!%&@$()+=\s]+$/gi.test(v);

const isLatinText = (v) => /^[a-zA-Z0-9-.,?!%&@$()+=\s]+$/gi.test(v);

module.exports = {
  isEmail,
  isLinkImage,
  isUrl,
  isCyrillicText,
  isLatinText,
};
