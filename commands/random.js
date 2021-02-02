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
  const embedOptions= {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Randomizer",
    fields: [{
      name: "Chosen One",
      value: `Yang terpilih adalah, jjeng jjeng!`
    },{
      name: "",
      value: `**__${chosenMember}__**`
    }],
  };
  const embedMessage = utils.embed(embedOptions);
  message.channel.send(embedMessage)
};

module.exports = random;
