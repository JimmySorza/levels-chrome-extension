import { Dispatch } from 'react';
import { User } from 'types';
import { convertIdToKey, localStorage } from 'utils';

export type UserAction = {
    type: ActionType;
    payload?: User;
};

export type ActionType = 'GET_USER';

export const get = (dispatch: Dispatch<UserAction>) => {
    const userData = localStorage('ajs_user_traits').get() as User;

    const imageKey = `LRU:LocalPreferenceStore3:${convertIdToKey(
        userData?.user_id || ''
    )}:PublicSpaceData:${convertIdToKey((userData?.groups || [])[0] || '')}`;

    const imageData = localStorage(imageKey).get();

    return dispatch({
        type: 'GET_USER',
        payload: {
            ...userData,
            image: imageData?.value?.icon || '',
        },
    });
};
