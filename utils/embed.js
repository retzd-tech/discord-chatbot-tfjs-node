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
    embed = {
      ...embed,
      color: options.color
    }
  }

  if(options.author){
    embed = {
      ...embed,
      author: options.author
    }
  }

  if(options.title){
    embed = {
      ...embed,
      title: options.title
    }
  }

  if(options.url){
    embed = {
      ...embed,
      url: options.url
    }
  }

  if(options.description){
    embed = {
      ...embed,
      description: options.description
    }
  }

  if(options.fields){
    embed = {
      ...embed,
      fields: options.fields
    }
  }

  if(options.footer){
    embed = {
      ...embed,
      footer: options.footer
    }
  }

  return { embed };
};

module.exports = createEmbed;
