import { backendHttpClient } from "@/clients/http.clinet";
import type {
	ICreateGroupDtoIn,
	IDeleteGroupDtoIn,
	IGetAllGroupMemberByIdDtoIn,
	IGetAllGroupMemberByIdDtoOut,
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

	async deleteGroup(req: IDeleteGroupDtoIn) {
		const { deleteGroup } = groupIntegrationPath;
		const res = await backendHttpClient.post(deleteGroup, req);
		return res.data;
	}

	async getAllGroupMemberByGroupId(
		req: IGetAllGroupMemberByIdDtoIn,
	): Promise<IApiResponse<IGetAllGroupMemberByIdDtoOut>> {
		const { getAllGroupMember } = groupIntegrationPath;
		const res = await backendHttpClient.post(getAllGroupMember, req);
		return res.data;
	}
}

export const groupIntegration = new GroupIntegration();
