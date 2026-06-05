import { backendHttpClient } from "@/clients/http.clinet";
import type {
	ICreateNewProjectTodoDoIn,
	ICreateNewProjectTodoDoOut,
	ICreatePersonalProjectDtoIn,
	IDeletePersonalProjectDtoIn,
	IGetAllPersonalProjectDtoOut,
	IGetAllPersonalProjectTodosWithFilterDtoIn,
	IGetAllPersonalProjectTodosWithFilterDtoOut,
	IGetPersonalProjectTodoDetailsDtoIn,
	IGetPersonalProjectTodoDetailsDtoOut,
	IUpdatePersonalProjectTodoDtoIn,
	IUpdatePersonalProjectTodoDtoOut,
} from "@/domain/dtos/personal/personal.dto";
import {
	personalProjectIntegrationPath,
	personalProjectTodoIntegrationPath,
} from "@/domain/paths/apiPath/personal/personalProject.path";
import type { IApiResponse } from "@/helper/response.helper";

class PersonalProjectIntegration {
	/**
	 * ! ====================
	 * ! PERSONAL PROJECT
	 * ! ====================
	 */
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

	async deletePersonalProject(req: IDeletePersonalProjectDtoIn) {
		const { deletePersonalProject } = personalProjectIntegrationPath;
		const res = await backendHttpClient.delete(deletePersonalProject, {
			data: req,
		});
		return res.data;
	}

	/**
	 * ! ====================
	 * ! PERSONAL PROJECT TODO
	 * ! ====================
	 */

	async createPersonalProjectTodo(
		req: ICreateNewProjectTodoDoIn,
	): Promise<IApiResponse<ICreateNewProjectTodoDoOut>> {
		const { createPersonalProjectTodo } = personalProjectTodoIntegrationPath;
		const res = await backendHttpClient.post(createPersonalProjectTodo, req);
		return res.data;
	}

	async getAllPersonalProjectTodoWithFilterAndLimit(
		req: IGetAllPersonalProjectTodosWithFilterDtoIn,
	): Promise<IApiResponse<IGetAllPersonalProjectTodosWithFilterDtoOut>> {
		const { getAllPersonalProjectTodoWithFilterAndLimit } =
			personalProjectTodoIntegrationPath;

		const res = await backendHttpClient.post(
			getAllPersonalProjectTodoWithFilterAndLimit,
			req,
		);
		return res.data;
	}

	async getPersonalProjectTodoDetails(
		req: IGetPersonalProjectTodoDetailsDtoIn,
	): Promise<IApiResponse<IGetPersonalProjectTodoDetailsDtoOut>> {
		const { getPersonalProjectTodoDetails } =
			personalProjectTodoIntegrationPath;

		const res = await backendHttpClient.post(
			getPersonalProjectTodoDetails,
			req,
		);
		return res.data;
	}

	async updatePersonalProjectTodo(req: IUpdatePersonalProjectTodoDtoIn) {
		const { updatePersonalProjectTodo } = personalProjectTodoIntegrationPath;
		const res = await backendHttpClient.put(updatePersonalProjectTodo, req);
		return res.data;
	}
}
export const personalProjectIntegration = new PersonalProjectIntegration();
