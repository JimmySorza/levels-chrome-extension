import jquery from 'jquery';

/**
 * Get Page Content
 *
 * @returns
 */
export const getPageContentEl = () => jquery('.notion-frame .notion-page-content');

/**
 * Get Menu Comment Item
 *
 * @returns
 */
export const getMenuCommentEl = () =>
    jquery('.notion-overlay-container.notion-default-overlay-container .notion-scroller.vertical div').children(
        ':eq(2)'
    );

/**
 * Get Overlay Element
 *
 * @returns
 */
export const getOverlayEl = () =>
    jquery('.notion-overlay-container.notion-default-overlay-container')
        .children(':eq(1)')
        .children(':eq(0)')
        .children(':eq(0)');

export const getSelectableBlocks = () => jquery('div.notion-page-content div.notion-selectable');

/**
 * Get Selectable Content's Id by child dom
 *
 * @param anchor
 * @returns
 */
export const getSelectableBlockIdByChild = (anchor: HTMLElement): string =>
    jquery(anchor).closest('div.notion-selectable').attr('data-block-id') || '';

/**
 * Get Selectable Content's Id by child dom
 *
 * @param anchor
 * @returns
 */
export const getSelectableBlockIdByBlockId = (blockId: string) =>
    jquery(`div.notion-page-content div.notion-selectable[data-block-id="${blockId}"]`);

export const getEditableBlockEl = (blockId: string) => {
    return getSelectableBlockIdByBlockId(blockId).find(`[contenteditable="true"]`);
};

export const getDiscussionButtonRoot = (blockId: string): HTMLElement => {
    let app: any;
    app = getSelectableBlockIdByBlockId(blockId).find(`#levels-discussion-btn-root`).get(0);
    if (app) {
        return app;
    }

    app = document.createElement('div');
    const editableBlockEl = getEditableBlockEl(blockId);
    app.id = 'levels-discussion-btn-root';
    editableBlockEl.after(app);
    return app;
};

export const getDiscussionListRoot = (blockId: string): HTMLElement => {
    let app: any;
    app = getSelectableBlockIdByBlockId(blockId).find(`#levels-discussion-list-root`).get(0);
    if (app) {
        return app;
    }
    const editableBlockEl = getEditableBlockEl(blockId);
    app = document.createElement('div');
    app.id = 'levels-discussion-list-root';
    editableBlockEl.parent().after(app);
    return app;
};
