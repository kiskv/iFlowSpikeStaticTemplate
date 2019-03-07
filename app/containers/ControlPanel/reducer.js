/*
 *
 * ControlPanel reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_TOOLBAR_ITEMS } from './constants';

export const initialState = fromJS({});

function controlPanelReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOOLBAR_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
}

export default controlPanelReducer;
