import React from 'react';
import { useStore } from 'react-redux';
import _ from 'lodash';
import { Avatar, Tooltip } from '@material-ui/core';

import MyBox from 'components/MyBox';
import MyButton from 'components/MyButton';
import { useRedux } from '@redux';

import { setAnchor, setInput, saveComment } from '@redux/comments/actions';
import DiscussionCard from './DiscussionCard';
import { BlockComment } from 'types/comment';

export type DiscussionListProps = {
    blockId: string;
};

const DiscussionList = (props: DiscussionListProps) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const store = useStore();
    const commentsState = useRedux('comments');
    const userState = useRedux('user');

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
        setCommentValue('');
    };

    const handleClickComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        saveComment(store.dispatch, commentValue);
        setInput(store.dispatch, false);
        setAnchor(store.dispatch, '');
        setCommentValue('');
    };

    if (props.blockId !== commentsState.anchor && !Object.keys(discussions).length) {
        return null;
    }

    return (
        <MyBox display="flex" flexDirection="row" paddingBottom={2} paddingLeft={2}>
            <MyBox display="flex" flexDirection="column" flexGrow={1}>
                <MyBox display="flex" flexDirection="column">
                    {Object.values(discussions)
                        .sort((a, b) => {
                            return a.created_at - b.created_at;
                        })
                        .map((discussion) => {
                            return <DiscussionCard key={discussion.id} discussion={discussion} />;
                        })}
                </MyBox>
                {props.blockId === commentsState.anchor && commentsState.isInput && (
                    <MyBox display="flex" flexDirection="column">
                        <MyBox display="flex" flexDirection="row" p={1}>
                            <Tooltip title={`${userState.given_name} ${userState.family_name}`}>
                                <Avatar
                                    src={userState.profile_photo}
                                    alt={`${userState.given_name} ${userState.family_name}`}
                                />
                            </Tooltip>

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
                        <MyBox display="flex" flexDirection="row" justifyContent="flex-end" p={1}>
                            <MyButton
                                className="levels-btn-cancel"
                                variant="contained"
                                color="secondary"
                                disableRipple
                                size="small"
                                onClick={handleClickCancel}
                            >
                                Cancel
                            </MyButton>

                            <MyButton
                                size="small"
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
            <MyBox>
                <MyButton className="levels-btn-collapse" size="small" variant="contained">
                    Collapse
                </MyButton>
            </MyBox>
        </MyBox>
    );
};

export default React.memo(DiscussionList);
