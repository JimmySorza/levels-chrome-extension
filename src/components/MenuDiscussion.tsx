import React from 'react';
import SmsIcon from '@material-ui/icons/Sms';
import { getSelectableBlockIdByChild, getOverlayEl } from 'content/scripts/selectors';
import { useStore } from 'react-redux';
import { setAnchor, setInput } from '@redux/comments/actions';
import jquery from 'jquery';

export type DiscussionMenuProps = {
    anchor: HTMLElement;
};

export const DiscussionMenu = (props: DiscussionMenuProps) => {
    const store = useStore();

    React.useEffect(() => {
        const blockId = getSelectableBlockIdByChild(props.anchor);
        if (blockId) {
            setAnchor(store.dispatch, blockId);
        }
    }, []);

    const handleClickDiscussion = () => {
        setInput(store.dispatch, true);
        // close modal
        getOverlayEl().click();
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: '120%',
                width: '100%',
                userSelect: 'none',
                minHeight: '28px',
                fontSize: '14px',
                transition: 'background 20ms ease-in 0s',
                cursor: 'pointer',
            }}
            onClick={handleClickDiscussion}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '14px' }}>
                <SmsIcon fontSize="small" color="primary" />
            </div>
            <div style={{ marginLeft: '8px', marginRight: '14px', minWidth: '0px', flex: '1 1 auto' }}>Discussion</div>
        </div>
    );
};
