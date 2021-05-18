import { Avatar } from '@material-ui/core';
import { MyBox } from 'components';
import React from 'react';
import { Comment } from 'types';

export type DiscussionCardProps = {
    discussion: Comment;
};

export const DiscussionCard = (props: DiscussionCardProps) => {
    return (
        <MyBox display="flex" flexDirection="row" alignItems="center" p={1}>
            <Avatar src="" alt="TEST TEST" sizes="" />
            <MyBox width="20px" />
            <MyBox>{props?.discussion?.comment || ''}</MyBox>
        </MyBox>
    );
};
