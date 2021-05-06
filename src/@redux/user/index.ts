import { createFlushReducer, composeReducers, createGetReducer } from '../@reducers';
import initialState from './initialState';
import enhaceLocalStorage from '../enhanceReducerWithWriteLocalStorage';

const NAME = '@user';

// reducers
const getReducer = createGetReducer(NAME, initialState);
const flushReducer = createFlushReducer(NAME, initialState.data);

export const userReducer = composeReducers(initialState)(getReducer, flushReducer as any);

export default userReducer;
