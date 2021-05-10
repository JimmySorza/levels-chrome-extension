import jquery from 'jquery';

export const getPageContentEl = () => jquery('.notion-frame .notion-page-content');

export const getMenuCommentEl = () =>
    jquery('.notion-overlay-container.notion-default-overlay-container .notion-scroller.vertical div').children(
        ':eq(2)'
    );

/**
 * Get Overlay
 *
 * @returns
 */
export const getOverlayEl = () =>
    jquery('.notion-overlay-container.notion-default-overlay-container')
        .children(':eq(1)')
        .children(':eq(0)')
        .children(':eq(0)');

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
    jquery(`div.notion-selectable[data-block-id="${blockId}"]`);
