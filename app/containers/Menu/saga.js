import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { GET_NAVIGATION_LIST, REQUEST_NAVIGATION_LIST, GET_NAVIGATION_LIST_ERROR, SET_LOADING, SET_DEFAULT_PAGE } from './constants';

async function doReq(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

function getDefaultPage(){
  return 'pe_rd_debtors_listview';
}

function* getNavigation() {
  try {
    yield put({type: SET_LOADING, loading: true});
    const result = yield call(doReq, 'http://dev-ws-v-05.compulink.local/iflow/robert/nav?_dc=1550754996520');
    if(result) {
      const navigation = result.children;
      const defaultPage = yield getDefaultPage();
      navigation.splice(0, 1);
      yield put({type: GET_NAVIGATION_LIST, navigation});
      yield put({type: SET_DEFAULT_PAGE, defaultPage});
      yield put({type: SET_LOADING, loading: false});
    }
  } catch (error) {
    yield put({type: GET_NAVIGATION_LIST_ERROR, error});
  }
}

// Individual exports for testing
export default function* menuSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(getNavigation);
  yield takeEvery(REQUEST_NAVIGATION_LIST, getNavigation);
}
