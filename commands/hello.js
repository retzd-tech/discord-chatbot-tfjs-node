const say = require('say');

const hello = async (message) => {
  try {
    message.reply('Hello!');
    say.speak('Halo juga! Apa kabar ?');
  }
  catch (e) {
    console.log(e.message);
    message.reply('Maaf, saya sedang sibuk');
  }
};

module.exports = hello;
