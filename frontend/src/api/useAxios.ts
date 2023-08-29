import axios from 'axios';

const BASE_URL = {
  development: 'http://localhost:3000/',
  production: ''
}[import.meta.env.MODE || 'development'];

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000
});

export default function useAxios() {
  async function get<T>({ url, config }: { url: string; config?: any }): Promise<Awaited<T>> {
    return await axiosInstance.get(url, config);
  }

  async function post<B, T>({ url, body }: { url: string; body: B }): Promise<Awaited<T>> {
    return await axiosInstance.post(url, body);
  }

  async function put<B, T>({ url, body }: { url: string; body: B }): Promise<Awaited<T>> {
    return await axiosInstance.put(url, body);
  }

  async function patch<B, T>({ url, body }: { url: string; body: B }): Promise<Awaited<T>> {
    return await axiosInstance.patch(url, body);
  }

  async function remove<T>(url: string): Promise<Awaited<T>> {
    return await axiosInstance.delete(url);
  }

  return { axiosInstance, get, post, put, patch, remove };
}
