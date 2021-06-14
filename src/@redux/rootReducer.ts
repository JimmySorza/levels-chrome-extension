import { combineReducers } from 'redux';
import { AppState } from './index';
import { initialState } from './initialState';

import user from './user';
import users from './users';
import comments from './comments';
import theme from './theme';
import group from './group';
import collapse from './collapse';

const { ...emptyInitState } = initialState;

const createAppReducer = (initialState: AppState) => {
    const appReducer = combineReducers({
        user,
        users,
        comments,
        theme,
        group,
        collapse,
    });

    return (state = initialState, action: any) => {
        const nextState = appReducer(state, action);
        return nextState;
    };
};

export default createAppReducer;
