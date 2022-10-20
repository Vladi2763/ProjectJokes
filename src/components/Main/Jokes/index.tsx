import { Joke as JokeType } from "../../../store/types";
import Joke from "../Joke";

import classes from "./Jokes.module.scss";

const Jokes: React.FC<{ jokes: Array<JokeType> }> = ({ jokes }) => {
  return (
    <section className={classes.section}>
      {jokes.map((joke) => (
        <Joke joke={joke} key={joke.guid} />
      ))}
    </section>
  );
};

export default Jokes;
