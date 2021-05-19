import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import jquery from 'jquery';

import { BlockComment } from 'types/comment';
import { getDiscussionButtonRoot, getDiscussionListRoot, getSelectableBlocks } from './scripts/selectors';
// import { getStore } from './scripts/getStore';
import DiscussionButton from './DiscussionButton';
import DiscussionList from './DiscussionList';
import App from './App';

let observer;

export const setupDiscussion = async () => {
    observer = new MutationObserver(onLoadedContent);
    observer.observe(document.querySelector('#notion-app') as any, { subtree: true, childList: true });
};

export const onLoadedContent = (mutations_list: MutationRecord[]) => {
    mutations_list.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (added_node) {
            //@ts-ignore
            if (added_node.className === 'notion-page-content') {
                setTimeout(() => {
                    const blocks = getSelectableBlocks();

                    blocks.each((index, element) => {
                        renderComments(jquery(element).attr('data-block-id') || '');
                    });
                }, 2000);
            }
        });
    });
};

export const renderComments = (blockId: string, comment: BlockComment = {}) => {
    if (!blockId) {
        return;
    }
    const buttonRoot = getDiscussionButtonRoot(blockId);
    const listRoot = getDiscussionListRoot(blockId);

    ReactDOM.render(
        <App>
            <DiscussionButton blockId={blockId} />
        </App>,
        buttonRoot
    );
    ReactDOM.render(
        <App>
            <DiscussionList blockId={blockId} />
        </App>,
        listRoot
    );
};
