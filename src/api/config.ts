/**
 * This file contains api configuration details that should match the
 * server configurations.
 */

const applicationContextPath = '/tsumego-kai';

const apiBasePath = applicationContextPath + '/api';
const applicationBasePath = applicationContextPath + '/app';
const staticBasePath = applicationContextPath + '/static';

export function apiPath(subPath: string) {
    return apiBasePath + subPath;
}

export function applicationPath(subPath: string) {
    return applicationBasePath + subPath;
}

export function staticPath(subPath: string) {
    return staticBasePath + subPath;
}

export const TOKEN_HEADER = 'TOKEN';