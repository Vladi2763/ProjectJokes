import toggleFavorite from "./toggleFavorite";

import { Joke } from "../store/types";

const contains = (where: Array<Joke>, what: Array<Joke>) => {
  let arr = [];
  for (let i = 0; i < where.length; i++) {
    for (let j = 0; j < what.length; j++) {
      if (where[i].guid === what[j].guid) {
        arr.push(toggleFavorite(where[i]));
      }
    }
  }

  for (let i = 0; i < where.length; i++) {
    for (let j = 0; j < what.length; j++) {
      if (!arr.find((joke) => joke.guid === where[i].guid)) {
        arr.push(where[i]);
      }
    }
  }
  return arr;
};

export default contains;