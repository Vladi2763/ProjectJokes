import { useSelector } from "react-redux";
import { InitialState } from "../../../../store/types";

import Jokes from "../../Jokes";

const FilteredJokesPage = () => {
  const jokes = useSelector((state: InitialState) => state.filteredJokes);

  return (
    <>
      <Jokes jokes={jokes} />
    </>
  );
};

export default FilteredJokesPage;
