import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  items: [],
  start: [1, 0, 3, 1, 1, 1, 1, 1],
};
const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": {
      const newArr = [...state.items, { node: action.node, selected: false }];
      return { ...state, items: newArr };
    }
    case "UPDATE_SELECTABLE": {
      const newArr = [...state.items];
      newArr[action.index] = {
        ...newArr[action.index],
        selected: action.does,
      };
      // console.log(newArr);
      return { ...state, items: newArr };
    }
    case "UPDATE_SELECTABLE_ARR": {
      let newArr = [...state.items];
      newArr = newArr.map((item, index) => {
        return { ...item, selected: action.newArr[index] };
      });
      return { ...state, items: newArr };
    }
    case "RESET_SELECTABLE": {
      const newArr = [...state.items];
      // newArr.fill(false);
      let i = 0;

      // if (
      //   !newArr.reduce((all, curr) => {
      //     return curr;
      //   }, false)
      // ) {
      //   console.log("here");
      //   return state;
      // }
      for (i = 0; i < newArr.length; i++) {
        newArr[i].selected = false;
      }
      return { ...state, items: newArr };
      // return state;
    }
    default:
      return state;
  }
};
const store = createStore(selectReducer, composeWithDevTools());
export default store;
