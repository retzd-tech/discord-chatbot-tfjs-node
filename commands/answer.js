const qna = require('@tensorflow-models/qna');
const fs = require('fs');

const Constant = require('../constant');

let model;

const initializeModel = async () => {
  model = await qna.load();
};

const getKnowledge = () => {
  return fs.readFileSync(Constant.BOT_KNOWLEDGE, Constant.READ_FILE_STANDARD);
};

const answer = async (message) => {
  const question = message.content.substring(10, message.content.length);
  const passage = getKnowledge();
  const receivedAnswer = await model.findAnswers(question, passage);
  if(receivedAnswer.length !== 0){
    const chosenAnswer = receivedAnswer[0];
    return message.reply(chosenAnswer.text);
  }
  return message.reply('Maaf belum tahu nih, kasih tahu dong lewat\n ```!dsme tell (ilmu baru nya disini ya)```');
};

module.exports = {
  initializeModel,
  answer
};
