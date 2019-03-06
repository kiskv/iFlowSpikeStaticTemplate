import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the form state domain
 */

const selectFormDomain = state => state.get('form', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Form
 */

const makeSelectForm = () =>
  createSelector(selectFormDomain, substate => substate.toJS());

export default makeSelectForm;
export { selectFormDomain };
