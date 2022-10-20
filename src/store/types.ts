import { ActionType } from "./actionsCreater";

export interface Category {
    guid: string;
    name: string;
    custom?: boolean;
  }
  
export interface Joke {
    genre: string;
    guid: string;
    tag: string;
    text: string;
    custom?: boolean;
    like?: boolean;
  }

  export interface ActionForHistory {
    text: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    newMinutes: string
  }
  
export interface Action {
    type: ActionType;
    categories: Array<Category>;
    selectedCategory: Category;
    joke: Joke;
    jokes: Array<Joke>;
    name: string;
    guid: string;
  }
  
export interface InitialState {
    categories: Array<Category>;
    customCategories: Array<Category>;
    selectedCategory: Category | null;
    jokes: Array<Joke>;
    customJokes: Array<Joke>;
    filteredJokes: Array<Joke>;
    favoriteJokes: Array<Joke>;
    history: Array<ActionForHistory>
  }