import { Dispatch } from 'react';
import { Group } from 'types';
import { localStorage } from 'utils';

export type GroupAction = {
    type: ActionType;
    payload?: Group;
};

export type ActionType = 'GET_GROUP';

export const get = (dispatch: Dispatch<GroupAction>) => {
    return dispatch({
        type: 'GET_GROUP',
        payload: localStorage('ajs_group_properties').get() as Group,
    });
};
