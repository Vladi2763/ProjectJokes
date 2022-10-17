import Aside from "./components/Aside/Aside";
import { useDispatch } from "react-redux";
import { CategoriesDispatch } from "./store/actionsCreater";

import { fetchJokesCategories } from "./store/actionsCreater";
import { useEffect } from "react";

const App = () => {
  const categoriesDispatch: CategoriesDispatch = useDispatch();

  useEffect(() => {
    categoriesDispatch(fetchJokesCategories());
  }, []);

  return <Aside />;
};

export default App;
