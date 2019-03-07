import { GET_NAVIGATION_LIST, GET_NAVIGATION_LIST_ERROR, REQUEST_NAVIGATION_LIST, SET_LOADING, SET_CURRENT_VIEW_ID, SET_DEFAULT_PAGE } from './constants';

export const initialState = {
  navigation: [],
  defaultPage: null,
};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_NAVIGATION_LIST: 
      return state;
    case GET_NAVIGATION_LIST:
      return {
        ...state,
        navigation: action.navigation,
      };
    case GET_NAVIGATION_LIST_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.loading, 
      }
    }
    case SET_CURRENT_VIEW_ID: {
      return {
        ...state,
        viewId: action.viewId,
      }
    }
    case SET_DEFAULT_PAGE: {
      return {
        ...state,
        defaultPage: action.defaultPage,
      }
    }
    default:
      return state;
  }
}

export default menuReducer;
