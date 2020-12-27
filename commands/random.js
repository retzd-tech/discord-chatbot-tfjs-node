const fs = require('fs');
const Constant = require('../constant');
const utils = require('../utils');

const getMembers = (squadName) => {
  return fs.readFileSync(`${Constant.DATA_DIRECTORY}${squadName}_members`, Constant.READ_FILE_STANDARD);
};

const random = async (client, message) => {
  const words = message.content.split(' ');
  const squadName = words[2];

  const membersText = getMembers(squadName);
  const members = membersText.split('\n');
  members.pop(); // remove auto enter on IDE LOL
  const randomIndex = Math.floor(Math.random() * members.length);
  const chosenMember = members[randomIndex];
  message.reply('Yakk siapa yang akan terpilih, jjeng jjeng! \n ```'+chosenMember+'``` ')
};

module.exports = random;
