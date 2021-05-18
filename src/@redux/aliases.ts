import { Dispatch } from 'react';
import { Comment } from 'types';
import { readDiscussion, uniqueId, writeDiscussion, writeUser } from 'utils';
import { AppState } from './index';

export const aliases = {
    'alias@SAVE_COMMENT': (originalAction: any) => {
        return (dispatch: Dispatch<any>, getState: () => AppState) => {
            const { user, group, comments } = getState();
            writeUser(user);
            const comment: Comment = {
                id: uniqueId(),
                comment: originalAction.payload,
                space_id: group?.space_id || '',
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

    'alias@GET_COMMENT': (originalAction: any) => {
        return (dispatch: Dispatch<any>, getState: () => AppState) => {
            const spaceId: string = originalAction.payload;
            readDiscussion(spaceId)
                .then((comments) => {
                    dispatch({
                        type: 'SET_COMMENT',
                        payload: comments,
                    });
                })
                .catch((err) => {
                    console.log('[=====Error in Alias Get Comment=====]', err);
                });
        };
    },
};
