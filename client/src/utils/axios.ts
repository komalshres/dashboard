import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";

const GLOBAL_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const createAxiosInstance = (baseURL: string | undefined) =>
  axios.create({
    baseURL,
  });

const globalAxios = createAxiosInstance(GLOBAL_BASE_URL);

const authAxios = createAxiosInstance(GLOBAL_BASE_URL);

authAxios.interceptors.request.use(
  (config) => {
    if (config.method === "post" || config.method === "put") {
      const swapValue = (obj: { [key: string]: string | null }) => {
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === "string" && !obj[key]) {
            obj[key] = null;
          }
        });
      };
      swapValue(config.data);
    }

    if (config.headers)
      if (!process.env.NEXT_PUBLIC_COOKIE_TOKEN) {
        throw new Error("NEXT_PUBLIC_COOKIE_TOKEN is required");
      } else {
        config.headers.Authorization = `Bearer ${
          getCookie(process.env.NEXT_PUBLIC_COOKIE_TOKEN)?.value
        }`;
      }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { globalAxios, authAxios };
