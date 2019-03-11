/*
 *
 * Form reducer
 *
 */
import { SET_VISIBLE_FORM } from './constants';

export const initialState = {
  visible: false,
};

function formReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBLE_FORM:
      return {
        ...state,
        visible: action.visible,
      };
    default:
      return state;
  }
}

export default formReducer;
