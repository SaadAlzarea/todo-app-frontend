import { backendHttpClient } from "@/clients/http.clinet";
import type {
	ICreatePersonalProjectDtoIn,
	IGetAllPersonalProjectDtoOut,
} from "@/domain/dtos/personal/personal.dto";
import { personalProjectIntegrationPath } from "@/domain/paths/apiPath/personal/personalProject.path";
import type { IApiResponse } from "@/helper/response.helper";

class PersonalProjectIntegration {
	async createPersonalProject(req: ICreatePersonalProjectDtoIn) {
		const { createPersonalProject } = personalProjectIntegrationPath;
		const res = await backendHttpClient.post(createPersonalProject, req);
		return res.data;
	}

	async getAllPersonalProject(): Promise<
		IApiResponse<IGetAllPersonalProjectDtoOut>
	> {
		const { getAllPersonalProject } = personalProjectIntegrationPath;
		const res = await backendHttpClient.post(getAllPersonalProject);
		return res.data;
	}
}
export const personalProjectIntegration = new PersonalProjectIntegration();
