import { fromJS } from 'immutable';
import editViewReducer from '../reducer';

describe('editViewReducer', () => {
  it('returns the initial state', () => {
    expect(editViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
