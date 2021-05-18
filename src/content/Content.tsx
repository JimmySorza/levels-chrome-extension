import { useRedux } from '@redux';
import { getComment } from '@redux/comments/actions';
import React from 'react';
import { useStore } from 'react-redux';
import { sendMessage } from 'utils';

export const Content = () => {
    const group = useRedux('group');
    const store = useStore();
    React.useEffect(() => {
        if (group.space_id) {
            sendMessage({ type: 'ACTIVE_PAGE_ACTION' });
            getComment(store.dispatch, group.space_id);
        }
    }, [group.space_id]);
    return <div></div>;
};
