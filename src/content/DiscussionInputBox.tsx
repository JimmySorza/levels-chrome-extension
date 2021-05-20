import React from 'react';
import { Tooltip, Avatar } from '@material-ui/core';
import { useStore } from 'react-redux';

import { useRedux } from '@redux';
import MyBox from 'components/MyBox';
import MyButton from 'components/MyButton';
import { saveComment, setInput, setAnchor } from '@redux/comments/actions';

export type DiscussionInputBoxProps = {
    blockId: string;
};

const DiscussionInputBox = (props: DiscussionInputBoxProps) => {
    const [commentValue, setCommentValue] = React.useState('');

    const store = useStore();
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const userState = useRedux('user');
    const commentsState = useRedux('comments');

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
            if (props.blockId === commentsState.anchor && commentsState.isInput) {
                inputRef.current.focus();
            }
        }
    }, [inputRef]);

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentValue(e.target.value);
    };

    const handleClickComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        saveComment(store.dispatch, {
            block_id: props.blockId,
            comment: commentValue,
        });
        setInput(store.dispatch, false);
        setAnchor(store.dispatch, '');
        setCommentValue('');
    };

    // const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     setInput(store.dispatch, false);
    //     setAnchor(store.dispatch, '');
    //     setCommentValue('');
    // };

    return (
        <MyBox display="flex" flexDirection="column">
            <MyBox display="flex" flexDirection="row" p={1}>
                <Tooltip title={`${userState.given_name} ${userState.family_name}`}>
                    <Avatar src={userState.profile_photo} alt={`${userState.given_name} ${userState.family_name}`} />
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
                {/* <MyButton
                                className="levels-btn-cancel"
                                variant="contained"
                                color="secondary"
                                disableRipple
                                size="small"
                                onClick={handleClickCancel}
                            >
                                Cancel
                            </MyButton> */}

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
    );
};
export default React.memo(DiscussionInputBox);
