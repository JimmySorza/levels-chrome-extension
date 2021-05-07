import { Dispatch } from 'react';
import { User } from 'types';
import { localStorage } from 'utils';

export type UserAction = {
    type: ActionType;
    payload?: User;
};

export type ActionType = 'GET_THEME';

export const get = (dispatch: Dispatch<UserAction>) => {
    return dispatch({
        type: 'GET_THEME',
        payload: localStorage('theme').get() as User,
    });
};
