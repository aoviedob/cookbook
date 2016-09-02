import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../client/containers/DevTools';

/* const createStoreWithMiddleware = compose(applyMiddleware(thunk), DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}*/
export default compose(applyMiddleware(thunk), DevTools.instrument())(createStore)(rootReducer);
