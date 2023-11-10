import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduce from './reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reduce, composeEnhancer(applyMiddleware(thunk)));
export default store;
