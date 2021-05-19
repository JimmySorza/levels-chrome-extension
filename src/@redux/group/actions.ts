import { Dispatch } from 'react';
import { Group } from 'types';
import { convertIdToKey } from 'utils/convertIdToKey';
import localStorage from 'utils/localStorage';

export type GroupAction = {
    type: ActionType;
    payload?: Group;
};

export type ActionType = 'GET_GROUP';

export const get = (dispatch: Dispatch<GroupAction>) => {
    const groupData = localStorage('ajs_group_properties').get() as Group;

    return dispatch({
        type: 'GET_GROUP',
        payload: {
            ...groupData,
            space_id: convertIdToKey(groupData.space_id),
        },
    });
};
