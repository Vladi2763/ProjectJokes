import { useSelector } from "react-redux";
import { InitialState } from "../../../../store/types";
import Jokes from "../../Jokes";

const FavoritesJokes = () => {
  const jokes = useSelector((state: InitialState) => state.favoriteJokes);
  return (
    <>
      <Jokes jokes={jokes} />
    </>
  );
};

export default FavoritesJokes;
