const apis = [
    'alarms',
    'bookmarks',
    'browserAction',
    'commands',
    'contextMenus',
    'cookies',
    'downloads',
    'events',
    'extension',
    'extensionTypes',
    'history',
    'i18n',
    'idle',
    'notifications',
    'pageAction',
    'runtime',
    'storage',
    'tabs',
    'webNavigation',
    'webRequest',
    'windows',
] as const;

export type API_TYPE = typeof apis[number];

type ExtensionType = {
    [key in API_TYPE]: () => any;
};

/* tslint:disable */
class Extension implements ExtensionType {
    alarms: () => any = () => {};
    bookmarks: () => any = () => {};
    browserAction: () => any = () => {};
    commands: () => any = () => {};
    contextMenus: () => any = () => {};
    cookies: () => any = () => {};
    downloads: () => any = () => {};
    events: () => any = () => {};
    extension: () => any = () => {};
    extensionTypes: () => any = () => {};
    history: () => any = () => {};
    i18n: () => any = () => {};
    idle: () => any = () => {};
    notifications: () => any = () => {};
    pageAction: () => any = () => {};
    runtime: () => any = () => {};
    storage: () => any = () => {};
    tabs: () => any = () => {};
    webNavigation: () => any = () => {};
    webRequest: () => any = () => {};
    windows: () => any = () => {};
    constructor() {
        apis.forEach((api) => {
            this[api] = () => {};

            try {
                // @ts-ignore
                if (chrome[api]) {
                    // @ts-ignore
                    this[api] = chrome[api];
                }
            } catch (e) {
                return;
            }

            try {
                // @ts-ignore
                if (window[api]) {
                    // @ts-ignore
                    this[api] = window[api];
                }
            } catch (e) {
                return;
            }

            try {
                // @ts-ignore
                if (browser[api]) {
                    // @ts-ignore
                    this[api] = browser[api];
                }
            } catch (e) {
                return;
            }

            try {
                // @ts-ignore
                this.api = browser.extension[api];
            } catch (e) {
                // I want application to not crush, but don't care about the message
            }
        });

        try {
            // @ts-ignore
            if (browser && browser.runtime) {
                // @ts-ignore
                this.runtime = browser.runtime;
            }
        } catch (e) {
            return;
        }

        try {
            // @ts-ignore
            if (browser && browser.browserAction) {
                // @ts-ignore
                this.browserAction = browser.browserAction;
            }
        } catch (e) {
            // I want application to not crush, but don't care about the message
            return;
        }
    }
}

export default new Extension();
