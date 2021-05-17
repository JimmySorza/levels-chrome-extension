export type Comment = {
    id?: string;
    space_id?: string;
    block_id?: string;
    user_id?: string;
    created_at?: number;
    updated_at?: number;
    comment?: string;
};

export type BlockComment = {
    comments?: {
        [index: string]: Comment;
    };
    is_collapsed?: boolean;
};

export type SpaceBlockComment = {
    [index: string]: BlockComment;
};
