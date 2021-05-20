import { Dispatch } from 'react';
import { Comment } from 'types/comment';
import {
    readDiscussion,
    readUser,
    writeDiscussion,
    writeUser,
    readDiscussionCollapsed,
    writeDiscussionCollapsed,
} from 'utils/database';
import { uniqueId } from 'utils/uniqueId';
import { AppState } from './index';

export const aliases = {
    /**
     * Save Comment
     * @param originalAction
     * @returns
     */
    'alias@SAVE_COMMENT': (originalAction: any) => {
        return (dispatch: Dispatch<any>, getState: () => AppState) => {
            const { user, group, comments } = getState();
            writeUser(user);
            const comment: Comment = {
                id: uniqueId(),
                comment: originalAction?.payload?.comment || '',
                space_id: group?.space_id || '',
                block_id: originalAction?.payload?.block_id || '',
                user_id: user?.id || '',
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

    /**
     * Get All Comments
     * @param originalAction
     * @returns
     */
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

    /**
     * Get All users
     * @param originalAction
     * @returns
     */
    'alias@GET_ALL_USER': (originalAction: any) => {
        return (dispatch: Dispatch<any>, getState: () => AppState) => {
            readUser()
                .then((users) => {
                    dispatch({
                        type: 'SET_ALL_USER',
                        payload: users,
                    });
                })
                .catch((err) => {
                    console.log('[=====Error in Alias Get Users=====]', err);
                });
        };
    },

    /**
     * Get Collapse Info from database
     * @param originalAction
     * @returns
     */
    'alias@GET_COLLAPSE': (originalAction: any) => {
        return (dispatch: Dispatch<any>, getState: () => AppState) => {
            const { space_id = '', user_id = '' } = originalAction.payload;
            readDiscussionCollapsed(user_id, space_id)
                .then((collapsed) => {
                    dispatch({
                        type: 'SET_COLLAPSE',
                        payload: collapsed,
                    });
                })
                .catch((err) => {
                    console.log('[=====Error in Alias Get Collapse Info=====]', err);
                });
        };
    },

    /**
     * Save Collapse Info from database
     * @param originalAction
     * @returns
     */
    'alias@SAVE_COLLAPSE': (originalAction: any) => {
        return (dispatch: Dispatch<any>, getState: () => AppState) => {
            const { space_id = '', user_id = '', block_id = '', status = false } = originalAction.payload;
            writeDiscussionCollapsed(user_id, space_id, block_id, status);
            readDiscussionCollapsed(user_id, space_id)
                .then((collapsed) => {
                    dispatch({
                        type: 'SET_COLLAPSE',
                        payload: collapsed,
                    });
                })
                .catch((err) => {
                    console.log('[=====Error in Alias Get Collapse Info=====]', err);
                });
        };
    },
};
