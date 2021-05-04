import { browser } from 'webextension-polyfill-ts';

// @ts-ignore
export default browser.storage.sync ? browser.storage.sync : browser.storage.local;
