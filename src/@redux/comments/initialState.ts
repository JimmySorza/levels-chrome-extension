import { CommentData } from 'types';

const initialState: {
    isInput?: boolean;
    data?: CommentData;
    anchor?: string; // Content block id
} = {
    isInput: false,
    data: {},
};

export default initialState;
