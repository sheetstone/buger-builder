import { put } from "redux-saga/effects";

import axios from "../../axios-order";
import * as actions from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess({responsedata: response.data.name, orderData: action.orderData})
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrderStart());
  try {
    const response = yield axios.get('/orders.json?auth='+action.token+'&orderBy="userId"&equalTo="'+action.userId+'"');
    yield put(actions.fetchOrderSuccess({orders: response.data}))
  }catch(error){
    yield put(actions.fetchOrderFail({error: error}))
  }
}