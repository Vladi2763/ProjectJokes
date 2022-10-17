import Category from "../Category/Category";
import classes from "./Categories.module.scss";

import { useSelector } from "react-redux";

import {
  InitialState,
  Category as CategoryType,
} from "../../../store/mainReducer";

const Categories = () => {
  const categories = useSelector((state: InitialState) => state.categories);
  return (
    <div className={classes.categories}>
      {categories.map((category: CategoryType) => (
        <Category key={category.guid} category={category} />
      ))}
    </div>
  );
};

export default Categories;
