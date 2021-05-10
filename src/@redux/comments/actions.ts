import { Dispatch } from 'react';
import initialState from './initialState';

export type CommentAction = {
    type: ActionType;
    payload?: any;
};

export type ActionType = 'SET_INPUT' | 'SET_ANCHOR';

export const setInput = (dispatch: Dispatch<CommentAction>, status: boolean) => {
    return dispatch({
        type: 'SET_INPUT',
        payload: status,
    });
};

export const setAnchor = (dispatch: Dispatch<CommentAction>, el: string) => {
    return dispatch({
        type: 'SET_ANCHOR',
        payload: el,
    });
};
