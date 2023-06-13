import { notification } from 'antd';
import { extend } from 'umi-request';

export const API_URL = 'http://localhost:5000/server/api';

export const getAuthToken = () => localStorage.getItem('token');

export const setAuthToken = (token: string) => localStorage.setItem('token', token);

export const removeAuthToken = () => localStorage.removeItem('token');



export const request = extend({
    errorHandler (error: { response: Response }) {
        const { response } = error;
        
        if (response && response.status) {
            const { status, statusText } = response;
            notification.error({
                message: `Request error ${status}: ${statusText}`,
            });
        }
    },
    // prefix: API_URL,
  });
  
  request.interceptors.request.use((url:any, options:any) => {
    const token = getAuthToken();
    options.headers = {
      ...options.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  
    return {
      url,
      options,
    };
  });