const createEmbed = (options) => {
  let embed = {
    color: 13956418,
    author: 'Da Bot',
    timestamp: new Date(),
    footer: {
      text: "© DSME 2020"
    }
  };

  Object.assign(embed, options);

  return { embed };
};

module.exports = createEmbed;
