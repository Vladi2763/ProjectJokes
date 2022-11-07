import { Joke } from "../store/types";

const toggleFavorite = (joke: Joke) => {

  joke.like = !joke.like

  return joke
};
  
  export default toggleFavorite;