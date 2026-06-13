import { backendHttpClient } from "@/clients/http.clinet";
import type {
	IAddMemberToGroupDtoIn,
	ICreateGroupDtoIn,
	ICreateGroupProjectDtoIn,
	ICreateGroupProjectDtoOut,
	IDeleteGroupDtoIn,
	IDeleteMemberFromGroupDtoIn,
	IGetAllGroupMemberByIdDtoIn,
	IGetAllGroupMemberByIdDtoOut,
	IGetAllGroupProjectsDtoIn,
	IGetAllGroupProjectsDtoOut,
	IGetAllUserGroupsByUserIdDtoOut,
} from "@/domain/dtos/group/group.dto";
import {
	groupIntegrationPath,
	groupProjectsIntegrationPath,
} from "@/domain/paths/apiPath/group/group.path";
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

	async addNewMemberToGroupByUserEmail(req: IAddMemberToGroupDtoIn) {
		const { addMemberToGroup } = groupIntegrationPath;
		const res = await backendHttpClient.post(addMemberToGroup, req);
		return res.data;
	}

	async deleteMemberFromGroup(req: IDeleteMemberFromGroupDtoIn) {
		const { deleteMemberFromGroup } = groupIntegrationPath;
		const res = await backendHttpClient.post(deleteMemberFromGroup, req);
		return res.data;
	}

	async getAllGroupProjects(
		req: IGetAllGroupProjectsDtoIn,
	): Promise<IApiResponse<IGetAllGroupProjectsDtoOut>> {
		const { getAllGroupProjects } = groupProjectsIntegrationPath;
		const res = await backendHttpClient.post(getAllGroupProjects, req);
		return res.data;
	}

	async createGroupProject(
		req: ICreateGroupProjectDtoIn,
	): Promise<IApiResponse<ICreateGroupProjectDtoOut>> {
		const { createGroupProject } = groupProjectsIntegrationPath;
		const res = await backendHttpClient.post(createGroupProject, req);
		return res.data;
	}
}

export const groupIntegration = new GroupIntegration();
