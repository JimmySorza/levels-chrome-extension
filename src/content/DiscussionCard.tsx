import React from 'react';
import _ from 'lodash';

import { Avatar, Tooltip } from '@material-ui/core';
import MyBox from 'components/MyBox';

import { Comment } from 'types/comment';
import { User } from 'types/user';
import { useRedux } from '@redux';

export type DiscussionCardProps = {
    discussion: Comment;
};

const DiscussionCard = (props: DiscussionCardProps) => {
    const usersState = useRedux('users');
    const userInfo: User = _.get(usersState, props?.discussion?.user_id || '', {});

    return (
        <MyBox display="flex" flexDirection="row" alignItems="flex-start" p={1}>
            <Tooltip title={`${userInfo?.given_name || ''} ${userInfo?.family_name || ''}`}>
                <Avatar
                    src={userInfo.profile_photo}
                    alt={`${userInfo?.given_name || ''} ${userInfo?.family_name || ''}`}
                    sizes=""
                />
            </Tooltip>

            <MyBox width="10px" />
            <MyBox style={{ whiteSpace: 'pre-wrap' }}>{props?.discussion?.comment || ''}</MyBox>
        </MyBox>
    );
};

export default React.memo(DiscussionCard);
