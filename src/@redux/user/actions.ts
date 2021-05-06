import { Dispatch } from 'react';
import { User } from 'types';
import { localStorage } from 'utils';

export type UserAction = {
    type: ActionType;
    payload?: User;
};

export type ActionType = 'GET_USER';

export const get = (dispatch: Dispatch<UserAction>) => {
    return dispatch({
        type: 'GET_USER',
        payload: localStorage('ajs_user_traits').get() as User,
    });
};
