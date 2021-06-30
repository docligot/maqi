import reducers from './reducers/reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducers,applyMiddleware(thunk))


export default store;