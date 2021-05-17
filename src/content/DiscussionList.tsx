import { useRedux } from '@redux';
import React from 'react';
import { useStore } from 'react-redux';

import { MyBox, MyButton } from 'components';

import { setAnchor, setInput, setComment } from '@redux/comments/actions';

export type DiscussionListProps = {
    blockId: string;
};

export const DiscussionList = (props: DiscussionListProps) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const store = useStore();
    const commentsState = useRedux('comments');
    const [commentValue, setCommentValue] = React.useState('');

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
        console.log('~~~~ clicked cancel');
        setInput(store.dispatch, false);
        setAnchor(store.dispatch, '');
    };

    const handleClickComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        setComment(store.dispatch, commentValue);
        setInput(store.dispatch, false);
        setAnchor(store.dispatch, '');
    };

    return (
        <MyBox display="flex" flexDirection="column" padding={2}>
            <MyBox color="success.light">This is comments list</MyBox>
            {props.blockId === commentsState.anchor && commentsState.isInput && (
                <MyBox display="flex" flexDirection="column">
                    <MyBox>
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
