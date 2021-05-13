import { createStore, applyMiddleware } from 'redux';
import { alias } from 'webext-redux';
import createAppReducer from './rootReducer';

const aliases = {
    GET_USER: () => {
        console.log('~~~~ getting user');
    },
};

export const createStoreInstance = (preloadedState) => {
    const appReducer = createAppReducer(preloadedState);

    const store = createStore(appReducer, preloadedState, applyMiddleware(alias(aliases)));

    return store;
};

export default createStoreInstance(undefined);
