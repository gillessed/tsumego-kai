export interface IUser {
    id: number;
    roles: number[];
    login: string;
    firstName: string;
    lastName: string;
    rank: number;
    email: string;
}

export interface IToken {
    timestamp: string;
    userId: number;
    value: string;
}