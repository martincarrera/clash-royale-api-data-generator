require("dotenv").load();
const request = require("request");
const arenas = require("./data/arenas.json");
const cards = require("./data/cards.json");
const players = require("./data/players.json");
const chests = require("./data/chests.json");
const leagues = require("./data/leagues.json");
const user = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin"
};
const uri = "http://localhost:8085/";

request.post(
  {
    url: uri + "api/authenticate",
    headers: {
      Accept: "application/json"
    },
    form: user
  },
  async (err, httpResponse, body) => {
    const token = body;
    // await save(token, "api/cards", cards);
    // await save(token, "api/chests", chests);
    // await save(token, "api/players", players);
    // await save(token, "api/leagues", leagues);
    await save(token, "api/arenas", arenas);
  }
);

const save = (token, endpoint, objects) => {
  objects.forEach(o => {
    request.post(
      {
        url: uri + endpoint,
        headers: {
          Authorization: token,
          Accept: "application/json"
        },
        form: o
      },
      (err, httpResponse, body) => {
        console.log(o);
      }
    );
  });
};
