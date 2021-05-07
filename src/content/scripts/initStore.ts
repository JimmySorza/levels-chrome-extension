import { getStore } from './store';
import { get as getUser } from '@redux/user/actions';
import { get as getTheme } from '@redux/theme/actions';
import { get as getGroup } from '@redux/group/actions';

export const initStore = () => {
    getUser(getStore().dispatch);
    getTheme(getStore().dispatch);
    getGroup(getStore().dispatch);
};
