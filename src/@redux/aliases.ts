import { Dispatch } from 'react';
import { Comment } from 'types';
import { convertIdToKey, uniqueId, writeDiscussion, writeUser } from 'utils';
import { AppState } from './index';

export const aliases = {
    SET_COMMENT: (originalAction: any) => {
        return (dispatch: Dispatch<any>, getState: () => AppState) => {
            const { user, group, comments } = getState();
            writeUser(user);
            const comment: Comment = {
                id: uniqueId(),
                comment: originalAction.payload,
                space_id: convertIdToKey(group?.space_id || ''),
                block_id: comments.anchor,
                user_id: user.id,
                created_at: Date.now(),
                updated_at: Date.now(),
            };
            writeDiscussion(comment);
            return {
                type: originalAction.type,
                payload: comment,
            };
        };
    },
};
