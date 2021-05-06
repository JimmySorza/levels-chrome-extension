import { createStore } from 'redux';
import createAppReducer from './rootReducer';

export const createStoreInstance = (preloadedState) => {
    const appReducer = createAppReducer(preloadedState);

    const store = createStore(appReducer, preloadedState);

    return store;
};

export default createStoreInstance(undefined);
