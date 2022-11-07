import classes from "./Category.module.scss";

import { Category, InitialState } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCategory,
  JokesDispatch,
  fetchFilteredJokes,
} from "../../../store/actionsCreater";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Category: React.FC<{ category: Category }> = ({ category }) => {
  const dispatch = useDispatch();
  const jokesDispatch: JokesDispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: InitialState) => state.selectedCategory
  );

  const selectedGuid = selectedCategory ? selectedCategory?.guid : null;

  useEffect(() => {
    jokesDispatch(fetchFilteredJokes(selectedGuid));
  }, [selectedCategory]);

  const { guid: id, name } = category;

  const navigate = useNavigate();

  const checkSelectedCategory =
    selectedCategory?.guid === id ? "selectedCategory" : "";

  const selectCategoryHandler = (category: Category) => {
    dispatch(selectCategory(category));
    navigate("/filteredjokes");
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
