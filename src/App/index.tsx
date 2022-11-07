import Aside from "../components/Aside";
import Main from "../components/Main";
import Header from "../components/Header";

import { useDispatch } from "react-redux";
import { CategoriesDispatch } from "../store/actionsCreater";
import { fetchJokesCategories } from "../store/actionsCreater";
import { useEffect } from "react";

import classes from "./App.module.scss";

const App = () => {
  const categoriesDispatch: CategoriesDispatch = useDispatch();
  useEffect(() => {
    categoriesDispatch(fetchJokesCategories());
  }, []);

  return (
    <>
      <Header />
      <div className={classes.body}>
        <Aside />
        <Main />
      </div>
    </>
  );
};

export default App;
