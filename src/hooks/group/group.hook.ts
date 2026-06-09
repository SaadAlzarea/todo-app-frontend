import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type {
	ICreateGroupDtoIn,
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
