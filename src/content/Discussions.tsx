import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Provider } from 'react-redux';
import jquery from 'jquery';

import { AppState } from '@redux';

import { BlockComment } from 'types';
import { getDiscussionButtonRoot, getDiscussionListRoot, getSelectableBlocks, getStore } from './scripts';
import { DiscussionButton } from './DiscussionButton';
import { DiscussionList } from './DiscussionList';

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
    console.log('~~~~~~~~~~~~ get routes', blockId, buttonRoot, listRoot);

    const store = getStore();
    ReactDOM.render(
        <Provider store={store}>
            <DiscussionButton blockId={blockId} />
        </Provider>,
        buttonRoot
    );
    ReactDOM.render(
        <Provider store={store}>
            <DiscussionList blockId={blockId} />
        </Provider>,
        listRoot
    );
};
