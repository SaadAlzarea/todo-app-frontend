import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type {
	ICreateNewProjectTodoDoIn,
	ICreatePersonalProjectDtoIn,
	IDeletePersonalProjectDtoIn,
} from "@/domain/dtos/personal/personal.dto";
import { personalProjectIntegration } from "@/integration/personal/personal.integration";
import { mutationOptions, useMutation, useQuery } from "@tanstack/react-query";

/**
 * ! ====================
 * ! PERSONAL PROJECT
 * ! ====================
 */
export const useCreatePersonalProject = () => {
	return useMutation({
		mutationKey: [EMutationKey.CREATE_PERSONAL_PROJECT],
		mutationFn: async (body: ICreatePersonalProjectDtoIn) => {
			const res = await personalProjectIntegration.createPersonalProject(body);
			return res.data;
		},
	});
};

export const useGetAllPersonalProject = () => {
	return useQuery({
		queryKey: [EQueryKey.GET_ALL_PERSONAL_PROJECT],
		queryFn: async () => {
			const res = await personalProjectIntegration.getAllPersonalProject();
			return res.data;
		},
	});
};

export const useDeletePersonalProject = () => {
	return useMutation({
		mutationKey: [EMutationKey.DELETE_PERSONAL_DETAILS],
		mutationFn: async (body: IDeletePersonalProjectDtoIn) => {
			const res = await personalProjectIntegration.deletePersonalProject(body);
			return res.data;
		},
	});
};

/**
 * ! ====================
 * ! PERSONAL PROJECT TODO
 * ! ====================
 */

export const useCreatePersonalProjectTodo = () => {
	return useMutation({
		mutationKey: [EMutationKey.CREATE_PERSONAL_PROJECT_TODO],
		mutationFn: async (body: ICreateNewProjectTodoDoIn) => {
			const res =
				await personalProjectIntegration.createPersonalProjectTodo(body);
			return res.data;
		},
	});
};
