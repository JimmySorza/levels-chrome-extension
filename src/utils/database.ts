import firebase from 'firebase';
import { BlockComment, SpaceBlockComment, User, Comment, BlockCollapsed, SpaceBlockCollapsed } from 'types';
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
        console.log('~~~~~ writing user', user);
        if (!user.id) {
            throw `Could not write user because User Id is Empty!`;
        }
        database.ref(`/user/${user.id}`).set(user);
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
        database.ref(`/discussion/${comment.space_id}/${comment.block_id}/${comment.id}`).set(comment);
        return;
    } catch (error) {
        throw error;
    }
};

export const setDiscussionCollapsed = (userId: string, spaceId: string, blockId: string, status: boolean) => {
    try {
        if (!userId) {
            throw `Could not write discussion because user Id is Empty!`;
        }
        if (!spaceId) {
            throw `Could not write discussion because space Id is Empty!`;
        }
        if (!blockId) {
            throw `Could not write discussion because block Id is Empty!`;
        }

        database.ref(`/collapsed/${userId}/${spaceId}/${blockId}`).set(status);
        return;
    } catch (error) {
        throw error;
    }
};

export const getDiscussionCollapsed = async (
    userId: string,
    spaceId: string,
    blockId?: string
): Promise<SpaceBlockCollapsed | BlockCollapsed | boolean> => {
    try {
        let refStr = '/collapsed';
        if (userId) {
            refStr += `/${userId}`;
        }
        if (userId && spaceId) {
            refStr += `/${spaceId}`;
        }
        if (userId && spaceId && blockId) {
            refStr += `/${blockId}`;
        }

        const result = await database.ref(refStr).once('value');
        return result.val();
    } catch (error) {
        throw error;
    }
};

/**
 * Watch all Discussions
 *
 * @param spaceId
 * @param onChange
 */
export const watchDiscussion = (spaceId: string, onChange: (comments: BlockComment) => void) => {
    var blockCommentsRef = firebase.database().ref(`/discussion/${spaceId}`);
    blockCommentsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        onChange(data);
    });
};
