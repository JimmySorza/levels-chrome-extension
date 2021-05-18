import { Dispatch } from 'react';
import { User } from 'types';
import axios from 'axios';
import _ from 'lodash';

export type UserAction = {
    type: ActionType;
    payload?: User;
};

export type ActionType = 'GET_USER';

export const get = (dispatch: Dispatch<UserAction>) => {
    axios
        .post('https://www.notion.so/api/v3/getSpaces', {
            withCredentials: true,
        })
        .then(({ data }: any) => {
            const user = _.get(Object.values(_.get(Object.values(data)[0], 'notion_user', {}))[0], 'value');
            dispatch({
                type: 'GET_USER',
                payload: user,
            });
        })
        .catch((err) => {
            dispatch({
                type: 'GET_USER',
                payload: {},
            });
        });
    return;
};
