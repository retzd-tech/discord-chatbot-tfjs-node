const fs = require('fs');

const Constant = require('../constant');

const getKnowledge = () => {
  return fs.readFileSync(Constant.BOT_KNOWLEDGE, Constant.READ_FILE_STANDARD);
};

const updateKnowledge = (message, newKnowledge) => {
  const currentKnowledge = getKnowledge();
  if(currentKnowledge.includes(newKnowledge)){
    return message.reply('Helehhh, udah tahu kali ~.~');
  }
  const knowledge = currentKnowledge.concat(newKnowledge);
  fs.writeFileSync(Constant.BOT_KNOWLEDGE, knowledge);
  return message.reply('Oh gitu, baik terima kasih sharing nya ya :D');
};

const learn = async (message) => {
  const newKnowledge = message.content.substring(11, message.content.length).concat('\n');
  await updateKnowledge(message, newKnowledge);
};

module.exports = learn;
