import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editView state domain
 */

const selectEditViewDomain = state => state.get('editView', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditView
 */

const makeSelectEditView = () =>
  createSelector(selectEditViewDomain, substate => substate.toJS());

export default makeSelectEditView;
export { selectEditViewDomain };
