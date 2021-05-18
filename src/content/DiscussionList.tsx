import { useRedux } from '@redux';
import React from 'react';
import { useStore } from 'react-redux';
import _ from 'lodash';

import { MyBox, MyButton } from 'components';

import { setAnchor, setInput, saveComment } from '@redux/comments/actions';
import { Avatar } from '@material-ui/core';
import { DiscussionCard } from './DiscussionCard';
import { BlockComment } from 'types';

export type DiscussionListProps = {
    blockId: string;
};

export const DiscussionList = (props: DiscussionListProps) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const store = useStore();
    const commentsState = useRedux('comments');
    const userState = useRedux('user');
    console.log('~~~~~ commentsState', commentsState);
    const [commentValue, setCommentValue] = React.useState('');
    const discussions: BlockComment = _.get(commentsState, `data.${props.blockId}`, {});

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener(
                'mousedown',
                function (e) {
                    // e.preventDefault();
                    e.stopPropagation();
                },
                false
            );
            inputRef.current.addEventListener(
                'keydown',
                function (e) {
                    // e.preventDefault();
                    e.stopPropagation();
                },
                false
            );
            inputRef.current.focus();
        }
    }, [commentsState.anchor, commentsState.isInput]);

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentValue(e.target.value);
    };

    const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        setInput(store.dispatch, false);
        setAnchor(store.dispatch, '');
    };

    const handleClickComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        saveComment(store.dispatch, commentValue);
        setInput(store.dispatch, false);
        setAnchor(store.dispatch, '');
    };

    return (
        <MyBox display="flex" flexDirection="column" padding={2}>
            <MyBox display="flex" flexDirection="column">
                {Object.keys(discussions).map((key) => {
                    return <DiscussionCard discussion={discussions[key]} />;
                })}
            </MyBox>
            {props.blockId === commentsState.anchor && commentsState.isInput && (
                <MyBox display="flex" flexDirection="column">
                    <MyBox display="flex" flexDirection="row">
                        <Avatar
                            src={userState.profile_photo}
                            alt={`${userState.given_name} ${userState.family_name}`}
                        />
                        <MyBox width="10px" />
                        <textarea
                            ref={inputRef}
                            rows={1}
                            value={commentValue}
                            onChange={handleChangeComment}
                            style={{
                                width: '100%',
                            }}
                        />
                    </MyBox>
                    <MyBox display="flex" flexDirection="row" justifyContent="flex-end" py={2}>
                        <MyButton
                            className="levels-btn-cancel"
                            variant="contained"
                            color="secondary"
                            disableRipple
                            onClick={handleClickCancel}
                        >
                            Cancel
                        </MyButton>

                        <MyButton
                            className="levels-btn-comment"
                            color="primary"
                            variant="contained"
                            disableRipple
                            onClick={handleClickComment}
                        >
                            Comment
                        </MyButton>
                    </MyBox>
                </MyBox>
            )}
        </MyBox>
    );
};
