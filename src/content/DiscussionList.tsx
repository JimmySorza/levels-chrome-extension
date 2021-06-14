import React from 'react';
import { useStore, useSelector } from 'react-redux';
import _ from 'lodash';

import MyBox from 'components/MyBox';
import MyButton from 'components/MyButton';
import { AppState, useRedux } from '@redux';

import DiscussionCard from './DiscussionCard';
import DiscussionInputBox from './DiscussionInputBox';
import { BlockComment } from 'types/comment';
import { saveCollapse } from '@redux/collapse/actions';

export type DiscussionListProps = {
    blockId: string;
};

const DiscussionList = (props: DiscussionListProps) => {
    const store = useStore();
    const commentsState = useRedux('comments');
    const userState = useRedux('user');
    const groupState = useRedux('group');
    const collapsedState = useSelector((state: AppState) => state.collapse[props.blockId]);

    const discussions: BlockComment = _.get(commentsState, `data.${props.blockId}`, {});

    const handleClickCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
        saveCollapse(store.dispatch, {
            user_id: userState.id,
            space_id: groupState.space_id,
            block_id: props.blockId,
            status: !collapsedState,
        });
    };

    const isInitInput = props.blockId === commentsState.anchor && commentsState.isInput;

    if (!isInitInput && (Object.keys(discussions).length === 0 || collapsedState)) {
        return null;
    }

    return (
        <MyBox display="flex" flexDirection="row" paddingBottom={2} paddingLeft={2}>
            <MyBox display="flex" flexDirection="column" flexGrow={1}>
                {!collapsedState && (
                    <MyBox display="flex" flexDirection="column">
                        {Object.values(discussions)
                            .sort((a, b) => {
                                return a.created_at - b.created_at;
                            })
                            .map((discussion) => {
                                return <DiscussionCard key={discussion.id} discussion={discussion} />;
                            })}
                    </MyBox>
                )}
                {(isInitInput || Object.keys(discussions).length) && <DiscussionInputBox blockId={props.blockId} />}
            </MyBox>
            <MyBox mt={1} width="60px">
                {!collapsedState && !isInitInput && (
                    <MyButton
                        className="levels-btn-collapse"
                        size="small"
                        variant="contained"
                        onClick={handleClickCollapse}
                    >
                        Collapse
                    </MyButton>
                )}
            </MyBox>
        </MyBox>
    );
};

export default React.memo(DiscussionList);
