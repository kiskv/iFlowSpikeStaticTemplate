/*
 *
 * Menu actions
 *
 */

import { GET_NAVIGATION_LIST, REQUEST_NAVIGATION_LIST, GET_NAVIGATION_LIST_ERROR, SET_LOADING } from './constants';

export const reqNavigationList = () => ({
  type: REQUEST_NAVIGATION_LIST
});

export const navError = error => {
  return {
    type: GET_NAVIGATION_LIST_ERROR,
    error
  }
};

export const getNavigation = (navigation) => {
  return {
    type: GET_NAVIGATION_LIST,
    navigation
  }
};

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading
});
