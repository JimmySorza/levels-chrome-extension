import { applyMiddleware, createStore } from 'redux';
import { createPromise as createPromiseMiddleware } from 'redux-promise-middleware';
import createThunkerMiddleware from 'redux-thunker';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

import createAppReducer from './rootReducer';
import getInitialStateFromLocalStorage from './getInitialStateFromLocalStorage';

import fetch from './@thunker/fetch';

export const createStoreInstance = (preloadedState = getInitialStateFromLocalStorage(), history) => {
    const isDev = process.env.NODE_ENV !== 'production';

    const promiseMiddleware = createPromiseMiddleware({
        promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    });

    const thunkerMiddleware = createThunkerMiddleware({
        config: {
            reduxThunkCompatible: false,
            continuous: true,
        },
        extraArgumentsEnhanced: {
            fetch,
        },
        extraArguments: {
            history,
        },
    });

    const middleware = [thunkerMiddleware, promiseMiddleware];

    if (isDev) {
        // Add Redux Logger
        const createLogger = require('redux-logger').createLogger; // eslint-disable-line
        const logger = createLogger({
            collapsed: true,
        });
        middleware.push(logger);
    }

    const appReducer = createAppReducer(preloadedState, history);

    const store = createStore(appReducer, preloadedState, composeWithDevTools(applyMiddleware(...middleware)));

    return store;
};

const history = createBrowserHistory();

export default createStoreInstance(undefined, history);
