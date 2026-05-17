import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type { ICreatePersonalProjectDtoIn } from "@/domain/dtos/personal/personal.dto";
import { personalProjectIntegration } from "@/integration/personal/personal.integration";
import { useMutation, useQuery } from "@tanstack/react-query";

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
