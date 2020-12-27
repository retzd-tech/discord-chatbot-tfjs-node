const hello = async (message) => {
  try {
    message.reply('Hello!');
  }
  catch (e) {
    console.log(e.message);
    message.reply('Maaf, saya sedang sibuk');
  }
};

module.exports = hello;
