const DEFAULT_AGE = 60 * 60 * 24 * 30;

export function getCookie(name: string, defaultValue?: string, age?: number): string | undefined {
    const entry = document.cookie.split(';').find((entry) => entry.split('=')[0].trim() === name);
    const value = entry ? entry.split('=')[1] : undefined;
    if (!value && defaultValue) {
        setCookie(name, defaultValue, age);
        return defaultValue;
    } else {
        return value;
    }
}

export function setCookie(name: string, value: string, maybeAge?: number) {
    let age = DEFAULT_AGE;
    if (maybeAge !== undefined) {
        age = maybeAge;
    }
    document.cookie = `${name}=${value};max-age=${age}`;
}

export function deleteCookie(name: string) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

