import { applicationPath } from '../api/config';

export const paths = {
    home: () => applicationPath('/home'),
    login: () => applicationPath('/login'),
    create: () => applicationPath('/create'),
    solve: () => applicationPath('/solve'),
    user: (id: number) => applicationPath('/user/' + id),
};