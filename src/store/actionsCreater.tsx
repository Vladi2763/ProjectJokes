import fetchData from "../api/fetchData";

import { InitialState, Category, Joke } from "./types";

import { ThunkDispatch } from "redux-thunk";
import { ActionCreator, Action } from "redux";

import { url } from "../api/fetchData";

enum ActionCategories {
  SET_CATEGORIES = "SET_CATEGORIES",
  SELECT_CATEGORY = "SELECT_CATEGORY",
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  CLEAR_HISTORY = "CLEAR_HISTORY",
  DELETE_JOKES_FROM_CATEGORY = "DELETE_JOKES_FROM_CATEGORY",
}

enum ActionJokes {
  SET_JOKES = "SET_JOKES",
  FILTER_JOKES = "FILTER_JOKES",
  TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
  ADD_NEW_JOKE = "ADD_NEW_JOKE",
  DELETE_JOKE = "DELETE_JOKE",
}

export type ActionType = ActionCategories | ActionJokes;

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
    type: ActionCategories.SET_CATEGORIES,
    categories,
  };
};

export const fetchJokesCategories = () => {
  return (dispatch: CategoriesDispatch) => {
    fetchData("get", url("Genres")).then((data) => {
      dispatch(setJokesCategories(data));
    });
  };
};

const setJokes: ActionCreator<Action> = (jokes: Array<Joke>) => {
  return {
    type: ActionJokes.SET_JOKES,
    jokes,
  };
};

export const fetchJokes = () => {
  return (dispatch: JokesDispatch) => {
    fetchData("get", url("Jokes")).then((data) => {
      dispatch(setJokes(data));
    });
  };
};

export const fetchFilteredJokes = (category: string | null) => {
  return (dispatch: JokesDispatch) => {
    fetchData("get", url(`Jokes/genre?guidGenre=${category}`)).then((data) => {
      dispatch(filterJokes(data));
    });
  };
};

export const selectCategory = (selectedCategory: Category | null) => {
  return {
    type: ActionCategories.SELECT_CATEGORY,
    selectedCategory,
  };
};

export const addCategory = (name: string) => {
  return {
    type: ActionCategories.ADD_CATEGORY,
    name,
  };
};

export const deleteCategory = (guid: string) => {
  return {
    type: ActionCategories.DELETE_CATEGORY,
    guid,
  };
};

export const filterJokes: ActionCreator<Action> = (jokes: Array<Joke>) => {
  return {
    type: ActionJokes.FILTER_JOKES,
    jokes,
  };
};

export const toggleFavoriteJoke = (joke: Joke) => {
  return {
    type: ActionJokes.TOGGLE_FAVORITE,
    joke,
  };
};

export const addNewJoke = (name: string) => {
  return {
    type: ActionJokes.ADD_NEW_JOKE,
    name,
  };
};

export const deleteJoke = (guid: string) => {
  return {
    type: ActionJokes.DELETE_JOKE,
    guid,
  };
};

export const deleteJokes = () => {
  return {
    type: ActionCategories.DELETE_JOKES_FROM_CATEGORY,
  };
};

export const clearActionsHistory = () => {
  return {
    type: ActionCategories.CLEAR_HISTORY,
  };
};
