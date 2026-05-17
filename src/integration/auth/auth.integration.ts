import { backendHttpClient } from "@/clients/http.clinet";
import type {
	ILoginDtoIn,
	ILoginDtoOut,
	IRegisterDtoIn,
	IRegisterDtoOut,
} from "@/domain/dtos/auth/auth.dto";
import { authIntegrationPath } from "@/domain/paths/apiPath/auth/auth.apiPath";
import type { IApiResponse } from "@/helper/response.helper";

class AuthIntegration {
	async register(req: IRegisterDtoIn): Promise<IApiResponse<IRegisterDtoOut>> {
		const { register } = authIntegrationPath;
		const res = await backendHttpClient.post(register, req);
		return res.data;
	}
	async login(req: ILoginDtoIn): Promise<IApiResponse<ILoginDtoOut>> {
		const { login } = authIntegrationPath;
		const res = await backendHttpClient.post(login, req);
		return res.data;
	}
}

export const authIntegration = new AuthIntegration();
