import api, { AxiosRequestConfig } from './api';

// we have placed generic T in class declaration
// so we do not have to repeate it on each class method
class ApiClient<T> {
    private readonly endpoint;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll(config: AxiosRequestConfig = {}) {
        const controller = new AbortController();
        const response = api.request<T[]>({
            url: this.endpoint,
            signal: controller.signal,
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort,
        };
    }

    post(config: AxiosRequestConfig<T> = {}) {
        const controller = new AbortController();
        const response = api.request<T>({
            signal: controller.signal,
            url: this.endpoint,
            method: 'POST',
            ...config,
        });
        return {
            request: () => response.then((res) => res.data),
            cancel: () => controller.abort,
        };
    }
}

const create = <T>(endpoint: string) => new ApiClient<T>(endpoint);

export default create;
