import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitialState } from "../../../../store/types";

import {
  JokesDispatch,
  selectCategory,
} from "../../../../store/actionsCreater";

import { fetchJokes } from "../../../../store/actionsCreater";

import Jokes from "../../Jokes";

const AllJokesPage = () => {
  const jokesDispatch: JokesDispatch = useDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    jokesDispatch(fetchJokes());
    dispatch(selectCategory(null));
  }, []);

  const jokes = useSelector((state: InitialState) => state.jokes);

  return (
    <>
      <Jokes jokes={jokes} />
    </>
  );
};

export default AllJokesPage;
