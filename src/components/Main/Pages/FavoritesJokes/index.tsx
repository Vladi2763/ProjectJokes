import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../../../store/actionsCreater";
import { InitialState } from "../../../../store/types";
import Jokes from "../../Jokes";

const FavoritesJokes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectCategory(null));
  }, []);

  const jokes = useSelector((state: InitialState) => state.favoriteJokes);

  return (
    <>
      <Jokes jokes={jokes} />
    </>
  );
};

export default FavoritesJokes;
