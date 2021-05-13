import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Provider } from 'react-redux';
import jquery from 'jquery';

import { AppState } from '@redux';

import { BlockComment } from 'types';
import { getDiscussionButtonRoot, getSelectableBlocks, getStore } from './scripts';
import { DiscussionButton } from './DiscussionButton';
import { DiscussionList } from './DiscussionList';

export const setupDiscussion = async () => {
    const store = getStore();
    const state: AppState = store.getState();

    const blocks = getSelectableBlocks();
    console.log('~~~~ blocks', document.querySelectorAll('div.notion-selectable'));
    blocks.each((index, element) => {
        console.log('~~~~~ index', index, jquery(element).attr('data-block-id'));
    });

    Object.keys(state?.comments?.data || {}).map((blockId) => {
        renderComments(blockId, _.get(state, `comments.data.${blockId}`, {}));
        return blockId;
    });
};

export const renderComments = (blockId: string, comment: BlockComment = {}) => {
    const store = getStore();
    ReactDOM.render(
        <Provider store={store}>
            <DiscussionButton blockId={blockId} />
        </Provider>,
        getDiscussionButtonRoot(blockId)
    );
    ReactDOM.render(
        <Provider store={store}>
            <DiscussionList blockId={blockId} />
        </Provider>,
        getDiscussionButtonRoot(blockId)
    );
};
