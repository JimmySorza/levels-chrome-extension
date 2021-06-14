import { Dispatch } from 'react';
import _ from 'lodash';

export type CollapseAction = {
    type: ActionType;
    payload?: any;
};

export type ActionType = 'alias@GET_COLLAPSE' | 'SET_COLLAPSE' | 'alias@SAVE_COLLAPSE';

export const getCollapse = (dispatch: Dispatch<CollapseAction>, payload: any) => {
    return dispatch({
        type: 'alias@GET_COLLAPSE',
        payload: payload,
    });
};

export const saveCollapse = (dispatch: Dispatch<CollapseAction>, payload: any) => {
    return dispatch({
        type: 'alias@SAVE_COLLAPSE',
        payload: payload,
    });
};
