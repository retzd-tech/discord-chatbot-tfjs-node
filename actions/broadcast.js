const broadcastMessage = (channel, ceremony) => {
  channel.send(ceremony.message);
};

module.exports = broadcastMessage;
