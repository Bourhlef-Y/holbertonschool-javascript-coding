#!/usr/bin/node

const request = require('request');

request(process.argv[2], function (err, response, body) {
  if (err) {
    console.log(err);
  } else {
    const movieName = JSON.parse(body).results;
    let count = 0;

    for (const film of movieName) {
      for (const character of film.characters) {
        if (character.includes('/18/')) {
          count++;
        }
      }
    }
    console.log(count);
  }
});
