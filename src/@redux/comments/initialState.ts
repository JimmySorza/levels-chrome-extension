import { SpaceBlockComment } from 'types/comment';

const initialState: {
    isInput?: boolean;
    data?: SpaceBlockComment;
    anchor?: string; // Content block id
} = {
    isInput: false,
    data: {},
};

export default initialState;
