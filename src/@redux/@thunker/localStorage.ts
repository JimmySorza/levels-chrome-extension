import { Dispatch } from 'react';
import { localStorage } from 'utils';
import { AppState } from '..';

const createLocalStorage = ({ getState, dispatch }: { getState: () => AppState; dispatch: Dispatch<any> }) => {
    return localStorage;
};

export default createLocalStorage;
