import React from 'react';
import _ from 'lodash';

import { Avatar } from '@material-ui/core';
import { MyBox } from 'components';

import { Comment, User } from 'types';
import { useRedux } from '@redux';

export type DiscussionCardProps = {
    discussion: Comment;
};

export const DiscussionCard = (props: DiscussionCardProps) => {
    const usersState = useRedux('users');
    const userInfo: User = _.get(usersState, props?.discussion?.user_id || '', {});

    return (
        <MyBox display="flex" flexDirection="row" alignItems="center" p={1}>
            <Avatar
                src={userInfo.profile_photo}
                alt={`${userInfo?.given_name || ''} ${userInfo?.family_name || ''}`}
                sizes=""
            />
            <MyBox width="20px" />
            <MyBox>{props?.discussion?.comment || ''}</MyBox>
        </MyBox>
    );
};