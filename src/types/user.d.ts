import { Group } from './group';

export type User = {
    user_id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    user_persona?: string;
    user_org?: string;
    user_plan_type?: string;
    time_zone?: string;
    locale?: 'en-US';
    signup_time?: number;
    created_at?: number;
    used_desktop_web_app?: boolean;
    is_desktop?: boolean;
    is_mobile?: boolean;
    is_tablet?: boolean;
    is_react_native?: boolean;
    is_ios?: boolean;
    is_logged_in?: true;
    groups?: Array<Group['space_id']>;
};
