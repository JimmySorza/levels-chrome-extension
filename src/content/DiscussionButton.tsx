import React from 'react';
import { useStore, useSelector } from 'react-redux';
import { useRedux, AppState } from '@redux';
import { saveCollapse } from '@redux/collapse/actions';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import jquery from 'jquery';
import MyBox from 'components/MyBox';

export type DiscussionButtonProps = {
    blockId: string;
};

const DiscussionButton = (props: DiscussionButtonProps) => {
    const store = useStore();
    const commentsState = useSelector((state: AppState) => (state?.comments?.data || {})[props.blockId]);
    const userState = useRedux('user');
    const groupState = useRedux('group');
    const buttonRef = React.useRef<HTMLDivElement>(null);
    const [isExistComment, setExistComment] = React.useState(false);

    const collapsedState = useSelector((state: AppState) => state.collapse[props.blockId]);

    React.useEffect(() => {
        if (buttonRef.current) {
            setExistComment(Boolean(jquery(buttonRef.current).parent().parent().find('.notion-focusable').length));
            let observer = new MutationObserver(onLoadContent);
            observer.observe(buttonRef.current.parentElement?.parentElement as any, { subtree: true, childList: true });
        }
    }, [buttonRef]);

    const onLoadContent = (mutations_list: MutationRecord[]) => {
        mutations_list.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (added_node) {
                //@ts-ignore
                if (added_node.firstChild.classList.contains('notion-focusable')) {
                    setExistComment(true);
                }
            });
            mutation.removedNodes.forEach(function (removed_node) {
                //@ts-ignore
                if (removed_node.firstChild.classList.contains('notion-focusable')) {
                    setExistComment(false);
                }
            });
        });
    };

    const handleClickCollapse = () => {
        saveCollapse(store.dispatch, {
            user_id: userState.id,
            space_id: groupState.space_id,
            block_id: props.blockId,
            status: !collapsedState,
        });
    };

    if (!collapsedState) {
        return null;
    }

    return (
        <MyBox
            ref={buttonRef}
            display="flex"
            flexDirection="row"
            alignItems="center"
            onClick={handleClickCollapse}
            style={{
                cursor: 'pointer',
                position: 'absolute',
                top: '5px',
                fontSize: '13px',
                left: isExistComment ? '45px' : '10px',
            }}
        >
            <SmsOutlinedIcon fontSize="small" color="primary" />
            <span>{Object.keys(commentsState).length}</span>
        </MyBox>
    );
};

export default React.memo(DiscussionButton);
