import { applicationPath } from '../api/config';

export const paths = {
    home: () => applicationPath('/home'),
    login: () => applicationPath('/login'),
    create: () => applicationPath('/create'),
    solve: () => applicationPath('/solve'),
    signup: () => applicationPath('/signup'),
    settings: () => applicationPath('/settings'),
    user: (id: number) => applicationPath('/user/' + id),
};