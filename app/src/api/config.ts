/**
 * This file contains api configuration details that should match the
 * server configurations.
 */

const apiBasePath = '/tsumego-kai/api';
const applicationBasePath = '/tsumego-kai/app';

export function apiPath(subPath: string) {
    return apiBasePath + subPath;
}

export function applicationPath(subPath: string) {
    return applicationBasePath + subPath;
}

export const TOKEN_HEADER = 'TOKEN';