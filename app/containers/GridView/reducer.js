/*
 *
 * GridView reducer
 *
 */
import { SELECTED_ITEMS_OF_GRID, SET_ALLOW_FILTERING_TYPE } from './constants';

export const initialState = {
  selected: [],
  allowFiltering: true,
};

function gridViewReducer(state = initialState, action) {
  switch (action.type) {
    case SELECTED_ITEMS_OF_GRID:
      return {
        ...state,
        selected: action.selected,
      };
    case SET_ALLOW_FILTERING_TYPE: 
      return {
        ...state,
        allowFiltering: action.allowFiltering,
      }
    default:
      return state;
  }
}

export default gridViewReducer;
