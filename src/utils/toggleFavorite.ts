import { Joke } from "../store/types";

const toggleFavorite = (joke: Joke) => {
    if (!joke.like) {
      return {
        ...joke,
        like: true,
      };
    } else {
        delete joke.like;

        return joke;
    }
  };
  
  export default toggleFavorite;