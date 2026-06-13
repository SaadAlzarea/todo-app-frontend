import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type {
	IAddMemberToGroupDtoIn,
	ICreateGroupDtoIn,
	IDeleteGroupDtoIn,
	IGetAllGroupMemberByIdDtoIn,
	IGetAllUserGroupsByUserIdDtoIn,
} from "@/domain/dtos/group/group.dto";
import { groupIntegration } from "@/integration/group/group.integration";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateGroup = () => {
	return useMutation({
		mutationKey: [EMutationKey.CREATE_GROUP],
		mutationFn: async (body: ICreateGroupDtoIn) => {
			const res = await groupIntegration.createGroup(body);
			return res.data;
		},
	});
};

export const useGetAllUserGroupsByUserId = (
	// body: IGetAllUserGroupsByUserIdDtoIn,
) => {
	return useQuery({
		queryKey: [EQueryKey.GET_ALL_USER_GROUPS],
		queryFn: async () => {
			const res = await groupIntegration.getAllUserGroupsByUserId();
			return res.data;
		},
	});
};

export const useDeleteGroup = () => {
	return useMutation({
		mutationKey: [EMutationKey.DELETE_GROUP],
		mutationFn: async (body: IDeleteGroupDtoIn) => {
			const res = await groupIntegration.deleteGroup(body);
			return res.data;
		},
	});
};

export const useGetAllGroupMemberByGroupId = (
	body: IGetAllGroupMemberByIdDtoIn,
) => {
	return useQuery({
		queryKey: [EQueryKey.GET_ALL_GROUP_MEMBERS],
		queryFn: async () => {
			const res = await groupIntegration.getAllGroupMemberByGroupId(body);
			return res.data;
		},
	});
};

export const useAddNewMemberToGroupByUserEmail = () => {
	return useMutation({
		mutationKey: [EMutationKey.ADD_MEMBER_TO_GROUP],
		mutationFn: async (body: IAddMemberToGroupDtoIn) => {
			const res = await groupIntegration.addNewMemberToGroupByUserEmail(body);
			return res.data;
		},
	});
};
