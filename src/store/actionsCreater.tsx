import { fetchData } from "../utils/fetchData";
import { InitialState, Category } from "./mainReducer";

import { ThunkDispatch } from "redux-thunk";
import { ActionCreator, Action } from "redux";

export type CategoriesDispatch = ThunkDispatch<
  InitialState,
  void,
  Action<{ type: string; categories: Array<Category> }>
>;

export const setJokesCategories: ActionCreator<Action> = (
  categories: Array<Category>
) => {
  return {
    type: "SET_CATEGORIES",
    categories,
  };
};

export const fetchJokesCategories = () => {
  return (dispatch: CategoriesDispatch) => {
    fetchData("get", "http://localhost:5000/api/Genres").then((data) => {
      dispatch(setJokesCategories(data));
    });
  };
};

export const selectCategory = (selectedCategory: Category) => {
  return {
    type: "SELECT_CATEGORY",
    selectedCategory,
  };
};

export const addCategory = (name: string) => {
  return {
    type: "ADD_CATEGORY",
    name,
  };
};

export const deleteCategory = (guid: string) => {
  return {
    type: "DELETE_CATEGORY",
    guid,
  };
};
