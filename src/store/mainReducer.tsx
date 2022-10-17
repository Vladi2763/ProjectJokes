import getRandomGuid from "../utils/getRandomGuid";

export interface Category {
  guid: string;
  name: string;
  custom?: boolean;
}

interface Action {
  type: string;
  categories: Array<Category>;
  selectedCategory: Category;
  name: string;
  guid: string;
}

export interface InitialState {
  categories: Array<Category>;
  customCategories: Array<Category>;
  selectedCategory: Category | null;
}

const initialState: InitialState = {
  categories: [],
  customCategories: [],
  selectedCategory: null,
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
        localStorage.getItem("categories")!.length > 1
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

      customCategories.push(newCategory);
      categories.push(newCategory);

      localStorage.setItem("categories", JSON.stringify(customCategories));

      return {
        ...state,
        categories: [...categories],
        customCategories: [...customCategories],
      };
    }

    case "DELETE_CATEGORY": {
      const categories = state.categories;
      const customCategories = state.customCategories;

      const id = action.guid;

      const newCategories = categories.filter(
        (category) => category.guid !== id
      );

      const newCustomCategories = customCategories.filter(
        (category) => category.guid !== id
      );

      localStorage.setItem("categories", JSON.stringify(newCustomCategories));
      return {
        ...state,
        categories: [...newCategories],
        customCategories: [...newCustomCategories],
        selectedCategory: null,
      };
    }
    default:
      return state;
  }
};

export default mainReducer;
