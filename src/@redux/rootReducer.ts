import { combineReducers } from 'redux';
import { AppState } from './index';
import { initialState } from './initialState';

const { ...emptyInitState } = initialState;

const createAppReducer = (initialState: AppState) => {
    const appReducer = combineReducers({});

    return (state = initialState, action: any) => {
        const nextState = appReducer(state, action);
        if (action.type === '@auth/SIGN_OUT' || (action.error && action.payload.status === 401)) {
            if (localStorage) {
                localStorage.clear();
            }
            return {
                ...nextState,
                ...emptyInitState,
            };
        }

        return nextState;
    };
};

export default createAppReducer;
