import getRandomGuid from "../utils/getRandomGuid";
import toggleFavorite from "../utils/toggleFavorite";
import contains from "../utils/contains";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import addAction from "../utils/addAction";

import { Action, InitialState } from "./types";

const initialState: InitialState = {
  categories: [],
  customCategories: [],
  selectedCategory: null,
  jokes: [],
  customJokes: [],
  filteredJokes: [],
  favoriteJokes: getFromLocalStorage("favorites"),
  history: getFromLocalStorage("historyActions"),
};

const mainReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_CATEGORIES": {
      let newCategories;
      let customCategories;
      let modifiedCustomCategories = [];
      let categories = action.categories;

      if (
        localStorage.getItem("categories") &&
        localStorage.getItem("categories")!.length >= 1
      ) {
        customCategories = localStorage.getItem("categories") as string;
        modifiedCustomCategories = JSON.parse(customCategories);
        newCategories = categories.concat(modifiedCustomCategories);
      } else {
        newCategories = [...categories];
      }
      return {
        ...state,
        categories: [...newCategories],
        customCategories: [...modifiedCustomCategories],
      };
    }

    case "SELECT_CATEGORY": {
      const selectedCategory = action.selectedCategory;

      return {
        ...state,
        selectedCategory: selectedCategory,
      };
    }

    case "ADD_CATEGORY": {
      const newCategory = {
        guid: getRandomGuid(),
        name: action.name,
        custom: true,
      };

      const categories = state.categories;
      const customCategories = state.customCategories;
      const history = state.history;

      customCategories.push(newCategory);
      categories.push(newCategory);

      localStorage.setItem("categories", JSON.stringify(customCategories));

      const actionForHistory = addAction("Added new category");
      history.push(actionForHistory);

      localStorage.setItem("historyActions", JSON.stringify(history));

      return {
        ...state,
        categories: [...categories],
        customCategories: [...customCategories],
        history: [...history],
      };
    }

    case "DELETE_CATEGORY": {
      const categories = state.categories;
      const customCategories = state.customCategories;
      const history = state.history;

      const id = action.guid;

      const newCategories = categories.filter(
        (category) => category.guid !== id
      );

      const newCustomCategories = customCategories.filter(
        (category) => category.guid !== id
      );

      const actionForHistory = addAction("Deleted category");
      history.push(actionForHistory);

      localStorage.setItem("categories", JSON.stringify(newCustomCategories));
      localStorage.setItem("historyActions", JSON.stringify(history));
      return {
        ...state,
        categories: [...newCategories],
        customCategories: [...newCustomCategories],
        history: [...history],
        selectedCategory: null,
      };
    }

    case "SET_JOKES": {
      let allJokes;
      let newJokes;
      let customJokes;
      let modifiedCustomJokes = [];
      let jokes = action.jokes;

      if (
        localStorage.getItem("jokes") &&
        localStorage.getItem("jokes")!.length >= 1
      ) {
        customJokes = localStorage.getItem("jokes") as string;
        modifiedCustomJokes = JSON.parse(customJokes);
        allJokes = jokes.concat(modifiedCustomJokes);

        if (state.favoriteJokes.length) {
          newJokes = contains(allJokes, state.favoriteJokes);
        } else {
          newJokes = allJokes;
        }
      } else {
        if (state.favoriteJokes.length) {
          newJokes = contains(jokes, state.favoriteJokes);
        } else {
          newJokes = [...jokes];
        }
      }
      return {
        ...state,
        jokes: [...newJokes],
        customJokes: [...modifiedCustomJokes],
      };
    }

    case "FILTER_JOKES": {
      const jokes = state.jokes;
      const selectedCategory = state.selectedCategory;

      const filteredJokes = jokes.filter(
        (joke) => joke.genre === selectedCategory?.guid
      );

      return {
        ...state,
        filteredJokes: [...filteredJokes],
      };
    }

    case "TOGGLE_FAVORITE": {
      const history = state.history;
      const selectedCategory = state.selectedCategory;
      const joke = toggleFavorite(action.joke);
      const jokes = state.jokes;
      const favoriteJokes = state.favoriteJokes;
      let newFavoriteJokes;
      let actionForHistory;

      const index = jokes.findIndex((joke) => joke.guid === action.joke.guid);
      jokes[index] = joke;

      const filteredJokes = jokes.filter(
        (joke) => joke.genre === selectedCategory?.guid
      );

      if (joke.like) {
        newFavoriteJokes = favoriteJokes.concat(joke);
        actionForHistory = addAction("Added joke to favorites");
      } else {
        newFavoriteJokes = favoriteJokes.filter(
          (favoritejoke) => favoritejoke.guid !== joke.guid
        );
        actionForHistory = addAction("Deleted joke from favorites");
      }

      history.push(actionForHistory);

      localStorage.setItem("favorites", JSON.stringify(newFavoriteJokes));
      localStorage.setItem("historyActions", JSON.stringify(history));

      return {
        ...state,
        jokes: [...jokes],
        favoriteJokes: [...newFavoriteJokes],
        filteredJokes: [...filteredJokes],
      };
    }

    case "ADD_NEW_JOKE": {
      const text = action.name;
      const selectedCategory = state.selectedCategory;
      const jokes = state.jokes;
      const customJokes = state.customJokes;
      const history = state.history;

      const newJoke = {
        genre: selectedCategory?.guid || "",
        guid: getRandomGuid(),
        tag: getRandomGuid(),
        text: text,
        custom: true,
      };

      customJokes.push(newJoke);
      jokes.push(newJoke);

      const filteredJokes = jokes.filter(
        (joke) => joke.genre === selectedCategory?.guid
      );

      const actionForHistory = addAction("Added new joke");
      history.push(actionForHistory);

      localStorage.setItem("jokes", JSON.stringify(customJokes));
      localStorage.setItem("historyActions", JSON.stringify(history));

      return {
        ...state,
        customJokes: [...customJokes],
        filteredJokes: [...filteredJokes],
        jokes: [...jokes],
      };
    }

    case "DELETE_JOKE": {
      const jokes = state.jokes;
      const customJokes = state.customJokes;
      const favoriteJokes = state.favoriteJokes;
      const selectedCategory = state.selectedCategory;
      const history = state.history;

      const id = action.guid;

      const newJokes = jokes.filter((joke) => joke.guid !== id);

      const newFavoriteJokes = favoriteJokes.filter(
        (favoritejoke) => favoritejoke.guid !== id
      );

      const newCustomJokes = customJokes.filter((joke) => joke.guid !== id);

      const filteredJokes = newJokes.filter(
        (joke) => joke.genre === selectedCategory?.guid
      );

      const actionForHistory = addAction("Deleted joke");
      history.push(actionForHistory);

      localStorage.setItem("jokes", JSON.stringify(newCustomJokes));
      localStorage.setItem("favorites", JSON.stringify(newFavoriteJokes));
      localStorage.setItem("historyActions", JSON.stringify(history));

      return {
        ...state,
        jokes: [...newJokes],
        favoriteJokes: [...newFavoriteJokes],
        filteredJokes: [...filteredJokes],
        customJokes: [...newCustomJokes],
      };
    }

    case "CLEAR_HISTORY": {
      localStorage.removeItem("historyActions");

      return {
        ...state,
        history: [],
      };
    }
    default:
      return state;
  }
};

export default mainReducer;
