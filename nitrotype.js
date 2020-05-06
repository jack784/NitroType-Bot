const puppeteer = require("puppeteer");

const BASE_URL = "http://nitrotype.com/race";
let actualWord = [];

const nitrotype = {
  browser: null,
  page: null,

  initialize: async () => {
    nitrotype.browser = await puppeteer.launch({
      headless: false
    });

    nitrotype.page = await nitrotype.browser.newPage();

    await nitrotype.page.goto(BASE_URL, { waitUntil: "networkidle2" });
  },

  login: async (login, password) => {
    const sigUpButton = await nitrotype.page.$("a.header-login");
    await sigUpButton.click();

    await nitrotype.page.waitFor(3000);
    await nitrotype.page.type("input[name=username]", login, {
      delay: 50
    });
    await nitrotype.page.type("input[name=password]", password, {
      delay: 50
    });

    await nitrotype.page.waitFor(1000);

    await nitrotype.page.click("button[type=submit]");
  },

  firstRace: async () => {
    await nitrotype.page.waitFor(2000);
    let startRaceButton = await nitrotype.page.$(
      "div.profile-left div.profile-primaryActions a"
    );
    await startRaceButton.click();
    await nitrotype.page.waitFor(2000);
  },

  play: async WPM => {
    await nitrotype.page.waitFor(3000);

    await nitrotype.page.waitForFunction(
      'document.querySelector(".raceLight-status").innerText === "Type!"'
    );

    let letters = await nitrotype.page.$$("span.dash-word span.dash-letter");
    for (let letter of letters) {
      let char = await nitrotype.page.evaluate(
        element => element.textContent,
        letter
      );
      if (/\s/.test(char)) {
        actualWord.push("Space");
      } else actualWord.push(char);
    }

    for (let i = 0; i < actualWord.length - 1; i++) {
      await nitrotype.page.keyboard.press(actualWord[i]);
      await nitrotype.page.waitFor(WPM * 1.33333333);
    }

    actualWord = [];
  },

  nextRaces: async () => {
    await nitrotype.page.waitFor(2000);

    let levelUpButton = await nitrotype.page.$("button.levelup-close");

    if (levelUpButton) {
      await levelUpButton.click();
    }

    let achievementUnlockedButton = await nitrotype.page.$(
      "button.modal-close"
    );

    if (achievementUnlockedButton) {
      await achievementUnlockedButton.click();
    }

    await nitrotype.page.waitFor(1000);

    let startRaceButton = await nitrotype.page.$(
      "div.raceResults-footer button"
    );

    await startRaceButton.click();
  }
};

module.exports = nitrotype;
