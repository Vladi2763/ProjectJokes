import { fetchJokeCategories } from "../utils/fetchJokeCategories";
import { fetchJokes as fetchAllJokes } from "../utils/fetchJokes";
import { InitialState, Category, Joke } from "./types";

import { ThunkDispatch } from "redux-thunk";
import { ActionCreator, Action } from "redux";

export enum ActionType {
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_JOKES = "SET_JOKES",
  SELECT_CATEGORY = "SELECT_CATEGORY",
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  FILTER_JOKES = "FILTER_JOKES",
  TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
  ADD_NEW_JOKE = "ADD_NEW_JOKE",
  DELETE_JOKE = "DELETE_JOKE",
  CLEAR_HISTORY = "CLEAR_HISTORY",
}

export type CategoriesDispatch = ThunkDispatch<
  InitialState,
  void,
  Action<{ type: string; categories: Array<Category> }>
>;

export type JokesDispatch = ThunkDispatch<
  InitialState,
  void,
  Action<{ type: string; jokes: Array<Joke> }>
>;

const setJokesCategories: ActionCreator<Action> = (
  categories: Array<Category>
) => {
  return {
    type: ActionType.SET_CATEGORIES,
    categories,
  };
};

export const fetchJokesCategories = () => {
  return (dispatch: CategoriesDispatch) => {
    fetchJokeCategories("get", "http://localhost:5000/api/Genres").then(
      (data) => {
        dispatch(setJokesCategories(data));
      }
    );
  };
};

const setJokes: ActionCreator<Action> = (jokes) => {
  return {
    type: ActionType.SET_JOKES,
    jokes,
  };
};

export const fetchJokes = () => {
  return (dispatch: JokesDispatch) => {
    fetchAllJokes("get", "http://localhost:5000/api/Jokes").then((data) => {
      dispatch(setJokes(data));
    });
  };
};

export const selectCategory = (selectedCategory: Category) => {
  return {
    type: ActionType.SELECT_CATEGORY,
    selectedCategory,
  };
};

export const addCategory = (name: string) => {
  return {
    type: ActionType.ADD_CATEGORY,
    name,
  };
};

export const deleteCategory = (guid: string) => {
  return {
    type: ActionType.DELETE_CATEGORY,
    guid,
  };
};

export const filterJokes = () => {
  return {
    type: ActionType.FILTER_JOKES,
  };
};

export const toggleFavoriteJoke = (joke: Joke) => {
  return {
    type: ActionType.TOGGLE_FAVORITE,
    joke,
  };
};

export const addNewJoke = (name: string) => {
  return {
    type: ActionType.ADD_NEW_JOKE,
    name,
  };
};

export const deleteJoke = (guid: string) => {
  return {
    type: ActionType.DELETE_JOKE,
    guid,
  };
};

export const clearActionsHistory = () => {
  return {
    type: ActionType.CLEAR_HISTORY,
  };
};
