import classes from "./Joke.module.scss";

import { Joke } from "../../../store/types";
import { useDispatch } from "react-redux";

import { toggleFavoriteJoke, deleteJoke } from "../../../store/actionsCreater";

const Joke: React.FC<{ joke: Joke }> = (props) => {
  const dispatch = useDispatch();

  const toggleFavoriteHandler = (joke: Joke) => {
    dispatch(toggleFavoriteJoke(joke));
  };

  const deleteJokeHandler = (guid: string) => {
    dispatch(deleteJoke(guid));
  };

  return (
    <div className={classes.joke}>
      <div className={classes.joke__imgContainer}>
        {props.joke.custom && (
          <img
            src="./images/cross.svg"
            alt="cross"
            onClick={() => deleteJokeHandler(props.joke.guid)}
          />
        )}
      </div>
      <div>{props.joke.text}</div>
      <div className={classes.joke__imgContainer}>
        <img
          src={
            props.joke.like
              ? "./images/favoriteheart.svg"
              : "./images/heart.svg"
          }
          alt="like"
          onClick={() => toggleFavoriteHandler(props.joke)}
        />
      </div>
    </div>
  );
};

export default Joke;
