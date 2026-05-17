import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type { ILoginDtoIn, IRegisterDtoIn } from "@/domain/dtos/auth/auth.dto";
import { authIntegrationPath } from "@/domain/paths/apiPath/auth/auth.apiPath";
import { authIntegration } from "@/integration/auth/auth.integration";
import { Mutation, useMutation, useQuery } from "@tanstack/react-query";

export const useRegister = () => {
	return useMutation({
		mutationKey: [EMutationKey.REGISTER],
		mutationFn: async (body: IRegisterDtoIn) => {
			const res = await authIntegration.register(body);
			return res.data;
		},
	});
};

export const useLogin = () => {
	return useMutation({
		mutationKey: [EMutationKey.LOGIN],
		mutationFn: async (body: ILoginDtoIn) => {
			const res = await authIntegration.login(body);
			return res.data;
		},
	});
};
