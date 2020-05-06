const bot = require("./nitrotype");
const settings = require("./settings");

(async () => {
  await bot.initialize();

  await bot.login(settings.login, settings.password);

  await bot.firstRace();

  await bot.play(settings.WPM);

  for (let i = 0; i < settings.racesAmount - 1; i++) {
    await bot.nextRaces();
    await bot.play(settings.WPM);
  }

  console.log("BOT finished");
})();
