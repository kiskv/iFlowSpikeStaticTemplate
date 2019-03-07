/*
 *
 * Menu actions
 *
 */

import { GET_NAVIGATION_LIST, REQUEST_NAVIGATION_LIST, GET_NAVIGATION_LIST_ERROR, SET_LOADING, SET_CURRENT_VIEW_ID, SET_DEFAULT_PAGE, SET_OPENED_TYPE_MENU } from './constants';

export const reqNavigationList = () => ({
  type: REQUEST_NAVIGATION_LIST,
});

export const navError = error => ({
  type: GET_NAVIGATION_LIST_ERROR,
  error,
});

export const getNavigation = (navigation) => ({
  type: GET_NAVIGATION_LIST,
  navigation,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

export const setCurrentViewId = (viewId) => ({
  type: SET_CURRENT_VIEW_ID,
  viewId,
});

export const setDefaultPage = (defaultPage) => ({
  type: SET_DEFAULT_PAGE,
  defaultPage,
});

export const setOpenedType = (opened) => ({
  type: SET_OPENED_TYPE_MENU,
  opened,
});
