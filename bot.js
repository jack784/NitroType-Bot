const bot = require("./nitrotype");
const settings = require("./settings");

(async () => {
  await bot.initialize();

  await bot.login(settings.login willybobby , settings.password cadencarnes);

  await bot.firstRace(100);

  await bot.play(settings.WPM 90);

  for (let i = 0; i < settings.racesAmount 500
; i++) {
    await bot.nextRaces(100);
    await bot.play(settings.WPM 120);
  }

  console.log("BOT finished");
})();
