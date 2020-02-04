import { AxiosRequestConfig } from 'axios';
import { ApisauceInstance, ApiResponse } from 'apisauce';

enum ErrorType {
    SERVER_ERROR = 'SERVER_ERROR',
    LOGIN_ERROR = 'LOGIN_ERROR',
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
    NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
}

export class ApiError {
    constructor(
        public readonly message: string,
        public readonly errorType: ErrorType,
    ) {}
}

export class ApisauceWrapper {
    constructor (private readonly delegate: ApisauceInstance) {}

    public setHeader(key: string, value: string) {
        this.delegate.setHeader(key, value);   
    }

    public setHeaders(headers: [[string, string]]) {
        this.delegate.setHeaders(headers); 
    }

    public deleteHeader(name: string) {
        this.delegate.deleteHeader(name);   
    }
  
    public setBaseURL(baseUrl: string) {
        this.delegate.setBaseURL(baseUrl);
    }

    public getBaseURL() {
        return this.delegate.getBaseURL();
    }
  
    public get<T>(url: string, params?: {}, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.get(url, params, axiosConfig));
    }

    public delete<T>(url: string, params?: {}, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.delete(url, params, axiosConfig));
    }

    public head<T>(url: string, params?: {}, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.head(url, params, axiosConfig));
    }

    public post<T>(url: string, data?: any, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.post(url, data, axiosConfig));
    }

    public put<T>(url: string, data?: any, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.put(url, data, axiosConfig));
    }
    
    public patch<T>(url: string, data?: any, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.patch(url, data, axiosConfig));
    }

    public link<T>(url: string, params?: {}, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.link(url, params, axiosConfig));
    }

    public unlink<T>(url: string, params?: {}, axiosConfig?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.handleResponse(this.delegate.unlink(url, params, axiosConfig));
    }

    private async handleResponse<T>(promise: Promise<ApiResponse<T>>): Promise<ApiResponse<T>> {
        const response = await promise;
        if (!response.ok) {
            const message = 'There was an error communicating with the server: ' + response.status;
            throw new Error(message);
        } else if (response.data) {
            const data = response.data as any;
            if (data.error) {
                // TODO: handle authentication errors that need to redirect to login
                throw new ApiError(data.error, data.errorType);
            } else {
                return response;
            }
        } else {
            return response;
        }
    }
}