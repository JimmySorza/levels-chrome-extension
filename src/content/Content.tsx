import { useRedux } from '@redux';
import { getComment } from '@redux/comments/actions';
import { getAllUser } from '@redux/users/actions';
import { getCollapse } from '@redux/collapse/actions';
import React from 'react';
import { useStore } from 'react-redux';
import { sendMessage } from 'utils/sendMessages';

export const Content = () => {
    const group = useRedux('group');
    const user = useRedux('user');
    const store = useStore();
    React.useEffect(() => {
        if (group.space_id && user.id) {
            sendMessage({ type: 'ACTIVE_PAGE_ACTION' });
            getComment(store.dispatch, group.space_id);
            getAllUser(store.dispatch);
            getCollapse(store.dispatch, { space_id: group.space_id, user_id: user.id });
        }
    }, [group.space_id, user.id]);
    return <div></div>;
};
