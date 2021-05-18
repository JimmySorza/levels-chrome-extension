import { initStore } from 'content/scripts';
import { Dispatch } from 'react';

export type CommentAction = {
    type: ActionType;
    payload?: any;
};

export type ActionType = 'SET_INPUT' | 'SET_ANCHOR' | 'SAVE_COMMENT' | 'SET_COMMENT';

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

export const saveComment = (dispatch: Dispatch<CommentAction>, comment: string) => {
    initStore();
    return dispatch({
        type: 'SAVE_COMMENT',
        payload: comment,
    });
};

export const setComment = (dispatch: Dispatch<CommentAction>, comment: string) => {
    return dispatch({
        type: 'SET_COMMENT',
        payload: comment,
    });
};
