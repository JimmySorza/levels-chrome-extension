import { insertString } from './insertString';

export const convertIdToKey = (id: string = '') => {
    let tmp = insertString(id, 8, '-');

    tmp = insertString(tmp, 13, '-');

    tmp = insertString(tmp, 18, '-');

    tmp = insertString(tmp, 23, '-');
    return tmp;
};
