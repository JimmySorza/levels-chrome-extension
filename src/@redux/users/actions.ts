import { Dispatch } from 'react';
import _ from 'lodash';

export type UserAction = {
    type: ActionType;
    payload?: any;
};

export type ActionType = 'alias@GET_ALL_USER' | 'SET_ALL_USER';

export const getAllUser = (dispatch: Dispatch<UserAction>) => {
    return dispatch({
        type: 'alias@GET_ALL_USER',
        payload: null,
    });
};
