import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gridView state domain
 */

const selectGridViewDomain = state => state.get('gridView', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GridView
 */

const makeSelectGridView = () =>
  createSelector(selectGridViewDomain, substate => substate.toJS());

export default makeSelectGridView;
export { selectGridViewDomain };
