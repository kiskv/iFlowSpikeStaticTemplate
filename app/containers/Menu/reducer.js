import { GET_NAVIGATION_LIST, GET_NAVIGATION_LIST_ERROR, REQUEST_NAVIGATION_LIST, SET_LOADING } from './constants';

export const initialState = {
  navigation: []
};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NAVIGATION_LIST: 
      return state;
    case GET_NAVIGATION_LIST:
      return {
        ...state,
        navigation: action.navigation
      };
    case GET_NAVIGATION_LIST_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading 
      }
    }
    default:
      return state;
  }
}

export default menuReducer;
