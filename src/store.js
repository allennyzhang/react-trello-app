import logger from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from "redux";
import { boardReducer, columnReducer, cardReducer } from './redux';

const reducers = combineReducers({
  boardState: boardReducer,
  columnState: columnReducer,
  cardState: cardReducer
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;
