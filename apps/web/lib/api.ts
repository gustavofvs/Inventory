const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(response.status, errorData.error || "An error occurred");
    }
    return response.json() as Promise<T>;
}

export const api = {
    get: async <T>(endpoint: string, signal?: AbortSignal): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            signal,
        });
        return handleResponse<T>(res);
    },

    post: async <T>(endpoint: string, data: any): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return handleResponse<T>(res);
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "DELETE",
        });
        return handleResponse<T>(res);
    },
};
