const addOptions = (newOptions, oldOptions) => ({
  ...oldOptions,
  newOptions
});

const createEmbed = (options) => {
  let embed = {
    color: 13956418,
    author: 'Da Bot',
    timestamp: new Date(),
    footer: {
      text: "© DSME 2020"
    }
  };

  if(options.color){
    addOptions(options.color, embed);
  }

  if(options.author){
    addOptions(options.author, embed);
  }

  if(options.title){
    addOptions(options.author, embed);
  }

  if(options.url){
    addOptions(options.url, embed);
  }

  if(options.description){
    addOptions(options.description, embed);
  }

  if(options.fields){
    addOptions(options.fields, embed);
  }

  if(options.footer){
    addOptions(options.footer, embed);
  }

  return { embed };
}

module.exports = createEmbed;
