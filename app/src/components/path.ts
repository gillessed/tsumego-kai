import { applicationPath } from '../api/config';

export const paths = {
    home: () => applicationPath('/home'),
    login: () => applicationPath('/login'),
    create: () => applicationPath('/create'),
    solve: () => applicationPath('/solve'),
    signup: () => applicationPath('/signup'),
    settings: () => applicationPath('/settings'),
    profileRoute: () => applicationPath('/user/:id'),
    profile: (id: number) => applicationPath('/user/' + id),
};