import classes from "./Category.module.scss";

import { Category, InitialState } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";

import { selectCategory, filterJokes } from "../../../store/actionsCreater";

const Category: React.FC<{ category: Category }> = ({ category }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: InitialState) => state.selectedCategory
  );
  const { guid: id, name } = category;

  const checkSelectedCategory =
    selectedCategory?.guid === id ? "selectedCategory" : "";

  const selectCategoryHandler = (category: Category) => {
    dispatch(selectCategory(category));
    dispatch(filterJokes());
  };
  return (
    <div
      className={`${classes.category} ${
        classes[`category_${checkSelectedCategory}`]
      }`}
      onClick={() => selectCategoryHandler(category)}
    >
      <span className={classes.category__name}>{name}</span>
    </div>
  );
};

export default Category;
