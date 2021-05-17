import firebase from 'firebase';
import { BlockComment, SpaceBlockComment, User, Comment } from 'types';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export const readUser = async (id: string): Promise<User> => {
    try {
        const result = await database.ref(`/user/${id}`).once('value');
        return result.val();
    } catch (error) {
        console.log('[Database]: Could not read user data', error.toString());
        throw error;
    }
};

export const writeUser = async (user: User): Promise<void> => {
    try {
        if (!user.user_id) {
            throw `Could not write user because User Id is Empty!`;
        }
        database.ref(`/user/${user.user_id}`).set(user);
        return;
    } catch (error) {
        throw error;
    }
};

export const readDiscussion = async (
    spaceId: string = '',
    blockId: string = '',
    commentId: string = ''
): Promise<SpaceBlockComment | BlockComment | Comment> => {
    try {
        let refStr = '/discussion';
        if (spaceId) {
            refStr += `/${spaceId}`;
        }
        if (spaceId && blockId) {
            refStr += `/${blockId}`;
        }
        if (spaceId && blockId && commentId) {
            refStr += `/${commentId}`;
        }

        const result = await database.ref(refStr).once('value');
        return result.val();
    } catch (error) {
        console.log('[Database]: Could not read user data', error.toString());
        throw error;
    }
};

export const writeDiscussion = async (comment: Comment = {}): Promise<void> => {
    try {
        if (!comment.space_id) {
            throw `Could not write discussion because space Id is Empty!`;
        }
        if (!comment.block_id) {
            throw `Could not write discussion because block Id is Empty!`;
        }
        if (!comment.id) {
            throw `Could not write discussion because comment Id is Empty!`;
        }
        database.ref(`/discussion/${comment.space_id}/${comment.block_id}/${comment.space_id}`).set(comment);
        return;
    } catch (error) {
        throw error;
    }
};

export const setDiscussionCollapsed = (spaceId: string, blockId: string, status: boolean) => {
    try {
        if (!spaceId) {
            throw `Could not write discussion because space Id is Empty!`;
        }
        if (!blockId) {
            throw `Could not write discussion because block Id is Empty!`;
        }

        database.ref(`/discussion/${spaceId}/${blockId}/is_collapsed`).set(status);
        return;
    } catch (error) {
        throw error;
    }
};
