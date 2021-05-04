import reducer from './rootReducer';
import { initialState } from './initialState';
import { useSelector } from 'react-redux';

export const rootReducer = reducer;
export type AppState = typeof initialState;

export { default as createStore } from './createStore';

export const useRedux = <K extends keyof AppState>(key: K) => useSelector((state: AppState) => state[key]);

export const useReduxLoading = <K extends keyof AppState>(...keys: K[]) =>
    useSelector((state: AppState) => keys.some((key) => state[key]['isLoading'] || state[key]['isInitLoading']));
