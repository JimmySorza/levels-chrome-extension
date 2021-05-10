import { combineReducers } from 'redux';
import { AppState } from './index';
import { initialState } from './initialState';

import user from './user';
import comments from './comments';
import theme from './theme';
import group from './group';

const { ...emptyInitState } = initialState;

const createAppReducer = (initialState: AppState) => {
    const appReducer = combineReducers({
        user,
        comments,
        theme,
        group,
    });

    return (state = initialState, action: any) => {
        const nextState = appReducer(state, action);
        return nextState;
    };
};

export default createAppReducer;
