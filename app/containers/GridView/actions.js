/*
 *
 * GridView actions
 *
 */

import { SELECTED_ITEMS_OF_GRID, SET_ALLOW_FILTERING_TYPE } from './constants';

export const setSelectedItems = (selected) => ({
  type: SELECTED_ITEMS_OF_GRID,
  selected,
});

export const setAllowFiltering = (allowFiltering) => ({
  type: SET_ALLOW_FILTERING_TYPE,
  allowFiltering,
});
