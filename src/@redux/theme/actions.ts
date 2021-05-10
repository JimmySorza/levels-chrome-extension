import { Dispatch } from 'react';
import { Theme } from 'types';
import { localStorage } from 'utils';

export type ThemeAction = {
    type: ActionType;
    payload?: Theme;
};

export type ActionType = 'GET_THEME';

export const get = (dispatch: Dispatch<ThemeAction>) => {
    return dispatch({
        type: 'GET_THEME',
        payload: localStorage('theme').get() as Theme,
    });
};