/*
 *
 * GridView actions
 *
 */

import { SELECTED_ITEMS_OF_GRID } from './constants';

export const setSelectedItems = (selected) => ({
  type: SELECTED_ITEMS_OF_GRID,
  selected
})
