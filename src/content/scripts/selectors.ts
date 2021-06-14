import jquery from 'jquery';
import { LEVELS_BTN_DISCUSSION_ROOT_ID, LEVELS_LIST_DISCUSSION_ROOT_ID, LEVELS_MENU_DISCUSSION_ID } from './constant';

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
    jquery(`.notion-overlay-container.notion-default-overlay-container #${LEVELS_MENU_DISCUSSION_ID}`)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .prev();

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
    app = getSelectableBlockIdByBlockId(blockId).find(`#${LEVELS_BTN_DISCUSSION_ROOT_ID}`).get(0);
    if (app) {
        return app;
    }

    app = document.createElement('div');
    const editableBlockEl = getEditableBlockEl(blockId);
    app.id = LEVELS_BTN_DISCUSSION_ROOT_ID;
    editableBlockEl.after(app);
    return app;
};

export const getDiscussionListRoot = (blockId: string): HTMLElement => {
    let app: any;
    app = getSelectableBlockIdByBlockId(blockId).find(`#${LEVELS_LIST_DISCUSSION_ROOT_ID}`).get(0);
    if (app) {
        return app;
    }
    const editableBlockEl = getEditableBlockEl(blockId);
    app = document.createElement('div');
    app.id = LEVELS_LIST_DISCUSSION_ROOT_ID;
    editableBlockEl.parent().after(app);
    return app;
};
