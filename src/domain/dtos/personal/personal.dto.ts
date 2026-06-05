import type {
	VCreateNewProjectTodoDoIn,
	VCreateNewProjectTodoDoOut,
	VCreatePersonalProjectDtoIn,
	VDeletePersonalProjectDtoIn,
	VGetAllPersonalProjectDtoOut,
	VGetAllPersonalProjectTodosWithFilterDtoIn,
	VGetAllPersonalProjectTodosWithFilterDtoOut,
	VPersonalProjectTodoGetTodoDetailsDtoIn,
	VPersonalProjectTodoGetTodoDetailsDtoOut,
	VUpdatePersonalProjectTodoDtoIn,
	VUpdatePersonalProjectTodoDtoOut,
} from "@/domain/validations/personal/personal.validation";
import type { Static } from "@sinclair/typebox";
import type { JSX } from "react/jsx-runtime";

// ! ====================
// ! == Personal Project
// ! ====================

// * CREATE PERSONAL PROJECT
export interface ICreatePersonalProjectDtoIn
	extends Static<typeof VCreatePersonalProjectDtoIn> {}

// * GET ALL PROJECTS
export interface IGetAllPersonalProjectDtoOut
	extends Static<typeof VGetAllPersonalProjectDtoOut> {
	map(arg0: (element: any) => JSX.Element): import("react").ReactNode;
}

// * DELETE PERSONAL PROJECT
export interface IDeletePersonalProjectDtoIn
	extends Static<typeof VDeletePersonalProjectDtoIn> {}

// ! ====================
// ! == Personal Project Todo
// ! ====================

// * CREATE NEW TODO
export interface ICreateNewProjectTodoDoIn
	extends Static<typeof VCreateNewProjectTodoDoIn> {}
export interface ICreateNewProjectTodoDoOut
	extends Static<typeof VCreateNewProjectTodoDoOut> {}

// * GET ALL TODOS WITH FILTER
export interface IGetAllPersonalProjectTodosWithFilterDtoIn
	extends Static<typeof VGetAllPersonalProjectTodosWithFilterDtoIn> {}
export interface IGetAllPersonalProjectTodosWithFilterDtoOut
	extends Static<typeof VGetAllPersonalProjectTodosWithFilterDtoOut> {}

// * GET TODO DETAILS
export interface IGetPersonalProjectTodoDetailsDtoIn
	extends Static<typeof VPersonalProjectTodoGetTodoDetailsDtoIn> {}
export interface IGetPersonalProjectTodoDetailsDtoOut
	extends Static<typeof VPersonalProjectTodoGetTodoDetailsDtoOut> {}

// * UPDATE TODO
export interface IUpdatePersonalProjectTodoDtoIn
	extends Static<typeof VUpdatePersonalProjectTodoDtoIn> {}
export interface IUpdatePersonalProjectTodoDtoOut
	extends Static<typeof VUpdatePersonalProjectTodoDtoOut> {}
