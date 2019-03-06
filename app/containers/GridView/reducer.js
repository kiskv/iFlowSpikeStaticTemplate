/*
 *
 * GridView reducer
 *
 */

import { fromJS } from 'immutable';
import { SELECTED_ITEMS_OF_GRID } from './constants';

export const initialState = {
  selected: []
};

function gridViewReducer(state = initialState, action) {
  switch (action.type) {
    case SELECTED_ITEMS_OF_GRID:
      return {
        ...state,
        selected: action.selected
      };
    default:
      return state;
  }
}

export default gridViewReducer;
