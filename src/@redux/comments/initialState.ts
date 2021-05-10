import { Comment } from 'types';

const initialState: {
    isInput?: boolean;
    comments?: Comment;
    anchor?: string; // Content block id
} = {
    isInput: false,
    comments: [],
};

export default initialState;
