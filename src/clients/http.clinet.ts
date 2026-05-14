import axios from "axios";
import { backendHttpConfig } from "@/config/http.config";
import { AuthenticationLocalStorage } from "@/data/authentication.localStorage";
import { API_URL } from "@/config/env";

export const backendHttpClient = axios.create({
	baseURL: backendHttpConfig.baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

backendHttpClient.interceptors.request.use(
	(request) => {
		const token = AuthenticationLocalStorage.getToken();
		request.headers = request.headers ?? {};

		if (token) {
			request.headers.Authorization = `Bearer ${token}`;
		}
		return request;
	},
	(error) => Promise.reject(error),
);
