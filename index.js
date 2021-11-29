const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const request = require('request');
const os = require('os-utils');
const config = require("./config.json");

const prefix = "s!"

const stats = [
    "1", 
    "2",
    "3", 
    "4"
    ];

client.on("ready", () => {
    setInterval(() => {
      const index = Math.floor(Math.random() * (stats.length - 1) + 1);
      client.user.setActivity(stats[index]);
  }, 10000);
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.on("message", async message => {

if(message.content.startsWith(prefix + 'ping')) {
  const m = await message.channel.send("Ping?");
  m.edit(`Pong! Latency is **${m.createdTimestamp - message.createdTimestamp}ms**! API Latency is **${Math.round(client.ws.ping)}ms**!`);
}
if(message.content.startsWith(prefix + 'cpu')) {
  const m = await message.channel.send("Checking CPU Usage...");
  os.cpuUsage(function(usg){
  m.edit('CPU Usage (%): ' + usg )
  });
}
if(message.content.startsWith(prefix + 'servers')) {
  const m = await message.channel.send("Counting...");
  m.edit(`Bot is being used on ${client.guilds.cache.size} servers, with ${client.users.cache.size} people!`);
}

if(message.content.startsWith(prefix + 'destroy')) {
  if (message.author.id !== '${config.ownerid}') return;
  message.channel.send("Turning off the bot...");
  bot.destroy()
  }
if(message.content.startsWith(prefix + 'eval')) {
  if (message.author.id !== '') return;
  
  let evaled;
  try {
    evaled = await eval(args.join(' '));
    message.channel.send(inspect(evaled));
    console.log(inspect(evaled));
  }
  catch (error) {
    console.error(error);
    message.reply('Unknown error occured, check console for info.');
  }
}
if(message.content.startsWith(prefix + 'restart')) {
  if (message.author.id !== '${config.ownerid}') return;
  process.exit(1);
}
if(message.content.startsWith(prefix + 'uptime')) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
}
if(message.content.startsWith(prefix + 'status')) {
  request('config.website', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    message.channel.send(`Site is OK [${config.site}]`);
  }
})
}

});

client.login(config.token);