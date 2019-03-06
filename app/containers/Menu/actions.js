/*
 *
 * Menu actions
 *
 */

import { GET_NAVIGATION_LIST } from './constants';

export const getNavigation = async () => {
  const response = await fetch(
    'http://vnext/iflow/robert/nav?_dc=1550754996520',
  );
  const result = await response.json();
  if (result && result.children && result.children.length > 0) {
    const navigation = result.children;
    navigation.splice(0, 1);
    return navigation;
  }
}
