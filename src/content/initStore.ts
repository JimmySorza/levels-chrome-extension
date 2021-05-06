import { getStore } from './store';
import { get as getUser } from '@redux/user/actions';

export const initStore = () => {
    getUser(getStore().dispatch);
};
