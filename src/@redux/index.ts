import reducer from './rootReducer';
import { initialState } from './initialState';
import { useSelector } from 'react-redux';

export const rootReducer = reducer;

export type AppState = typeof initialState;

export { default as store } from './createStore';

export const useRedux = <K extends keyof AppState>(key: K) => useSelector((state: AppState) => state[key]);
