import { backendHttpClient } from "@/clients/http.clinet";
import type {
	ICreateGroupDtoIn,
	IGetAllUserGroupsByUserIdDtoIn,
	IGetAllUserGroupsByUserIdDtoOut,
} from "@/domain/dtos/group/group.dto";
import { groupIntegrationPath } from "@/domain/paths/apiPath/group/group.path";
import type { IApiResponse } from "@/helper/response.helper";

class GroupIntegration {
	async createGroup(req: ICreateGroupDtoIn) {
		const { createGroupWithAdminUser } = groupIntegrationPath;
		const res = await backendHttpClient.post(createGroupWithAdminUser, req);
		return res.data;
	}

	async getAllUserGroupsByUserId(
		// req: IGetAllUserGroupsByUserIdDtoIn,
	): Promise<IApiResponse<IGetAllUserGroupsByUserIdDtoOut>> {
		const { getAllUserGroupsByUserId } = groupIntegrationPath;
		const res = await backendHttpClient.post(getAllUserGroupsByUserId);
		return res.data;
	}
}

export const groupIntegration = new GroupIntegration();
