import { fromJS } from 'immutable';
import gridViewReducer from '../reducer';

describe('gridViewReducer', () => {
  it('returns the initial state', () => {
    expect(gridViewReducer(undefined, {})).toEqual(fromJS({}));
  });
});
