import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type {
	ICreateGroupDtoIn,
	IDeleteGroupDtoIn,
	IGetAllUserGroupsByUserIdDtoIn,
} from "@/domain/dtos/group/group.dto";
import { groupIntegration } from "@/integration/group/group.integration";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

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
