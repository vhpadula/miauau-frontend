import api from "./axiosConfig";

export const get = async (url: string, params?: any) => {
    const response = await api.get(url, { params });
    return response.data;
};

export const post = async (url: string, data: any) => {
    const response = await api.post(url, data);
    return response.data;
};

export const put = async (url: string, data: any) => {
    const response = await api.put(url, data);
    return response.data;
};

export const remove = async (url: string) => {
    const response = await api.delete(url);
    return response.data;
};

export const uploadFile = async (url: string, id: string, file: File) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file);

    const response = await api.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

