const utils = require('../utils');
const say = require('say');
const discordTTS=require("discord-tts");

const come = async (client, message) => {
  // const words = message.content;
  // const roomName = words.slice(11, words.length);
  //
  // // const channel = utils.channel.getChannel(client, roomName);
  // const voiceChannel = message.member.voice.channel;
  //
  // const broadcast = client.voice.createBroadcast();
  // var channelId = message.member.voice.channelID;
  // var channel = client.channels.cache.get(channelId);
  //
  // try {
  //
  //   channel.join().then(async connection =>{
  //     const voiceStream = await discordTTS.getVoiceStream("Halo, bisa saya bantu ?");
  //     broadcast.play(voiceStream);
  //     const dispatcher = connection.play(broadcast);
  //   }).catch(err => console.log(err));
  //   //
  //   // channel.join().then( async (connection)=> {
  //   //   console.log(connection);
  //   //   // await say.speak('Hello! bisa saya bantu ?');
  //   //   // await channel.leave();
  //   // });
  //   // message.reply('Siapp, saya datang!');
  // }
  // catch (e) {
  //   console.log(e.message);
  //   // message.reply('Maaf, saya sedang sibuk');
  // }
};

module.exports = come;
