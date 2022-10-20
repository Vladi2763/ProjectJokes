import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitialState } from "../../../../store/types";

import { JokesDispatch } from "../../../../store/actionsCreater";

import { fetchJokes } from "../../../../store/actionsCreater";

import Jokes from "../../Jokes";

const AllJokesPage = () => {
  const jokesDispatch: JokesDispatch = useDispatch();

  useEffect(() => {
    jokesDispatch(fetchJokes());
  }, []);

  const jokes = useSelector((state: InitialState) => {
    if (!state.filteredJokes.length && !state.selectedCategory) {
      return state.jokes;
    } else {
      return state.filteredJokes;
    }
  });

  return (
    <>
      <Jokes jokes={jokes} />
    </>
  );
};

export default AllJokesPage;
