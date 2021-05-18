import { Dispatch } from 'react';
import { BlockComment, Comment, SpaceBlockComment } from 'types';
import { convertIdToKey, uniqueId, watchDiscussion, writeDiscussion, writeUser } from 'utils';
import { AppState } from './index';

export const aliases = {
    SAVE_COMMENT: (originalAction: any) => {
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
