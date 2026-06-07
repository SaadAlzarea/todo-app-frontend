import { ETodoPriority, ETodoStatus } from "@/definition/enums/todo.emun";
import { Type } from "@sinclair/typebox";
import { ValidationMessages } from "../validation.messages";

// ! ====================
// ! == Personal Project
// ! ====================

// * CREATE PROJECT
export const VCreatePersonalProjectDtoIn = Type.Object({
	project_name: Type.String(),
	project_deadline: Type.String(),
});

// * GET ALL PROJECTS
export const VGetAllPersonalProjectDtoOut = Type.Object({
	data: Type.Array(
		Type.Object({
			project_name: Type.String(),
			project_id: Type.String(),
			project_deadline: Type.String(),
			createdAt: Type.String(),
		}),
	),
	message: Type.String(),
});

// * DELETE PERSONAL PROJECT
export const VDeletePersonalProjectDtoIn = Type.Object({
	project_id: Type.String(),
});

// ! ====================
// ! == Personal Project Todo
// ! ====================

// * CREATE NEW TODO INSIDE PERSONAL PROJECT
export const VCreateNewProjectTodoDoIn = Type.Object({
	project_id: Type.String({}),
	title: Type.String({ minLength: 1 }),
	body: Type.String({ minLength: 1 }),
	priority: Type.Enum(ETodoPriority),
	status: Type.Enum(ETodoStatus),
	todo_deadline: Type.String(),
});

export const VCreateNewProjectTodoDoOut = Type.Object({
	todo_id: Type.String(),
	project_id: Type.String(),
	user_id: Type.String(),
	title: Type.String(),
	body: Type.String(),
	priority: Type.Enum(ETodoPriority),
	status: Type.Enum(ETodoStatus),
	todo_deadline: Type.String(),
	createdAt: Type.Date(),
	updatedAt: Type.Date(),
});

// * GET ALL TODOS WITH FILTER
export const VGetAllPersonalProjectTodosWithFilterDtoIn = Type.Object({
	project_id: Type.String(),
	todo_id: Type.Optional(
		Type.String({
			errorMessage: ValidationMessages.searchValidation.id,
		}),
	),
	priority: Type.Optional(Type.Enum(ETodoPriority)),
	status: Type.Optional(Type.Enum(ETodoStatus)),
	page: Type.Optional(Type.Number({ minimum: 1 })),
	limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});

export const VGetAllPersonalProjectTodosWithFilterDtoOut = Type.Object({
	data: Type.Object({
		data: Type.Array(
			Type.Object({
				todo_id: Type.String(),
				title: Type.String(),
				progress: Type.Optional(Type.String()),
				priority: Type.Enum(ETodoPriority),
				status: Type.Enum(ETodoStatus),
				isCompleted: Type.Boolean(),
			}),
		),
	}),
	page: Type.Number(),
	limit: Type.Number(),
	total: Type.Number(),
});

// * GET TODO DETAILS
export const VPersonalProjectTodoGetTodoDetailsDtoIn = Type.Object({
	todo_id: Type.String(),
});
export const VPersonalProjectTodoGetTodoDetailsDtoOut = Type.Object({
	todo_id: Type.String(),
	title: Type.String(),
	body: Type.String(),
	progress: Type.String(),
	priority: Type.Enum(ETodoPriority),
	status: Type.Enum(ETodoStatus),
	todo_deadline: Type.Date(),
	createdAt: Type.Date(),
	updatedAt: Type.Date(),
});

// * UPDATE TODO
export const VUpdatePersonalProjectTodoDtoIn = Type.Object({
	todo_id: Type.Optional(Type.String()),
	title: Type.Optional(Type.String()),
	body: Type.Optional(Type.String()),
	progress: Type.Optional(Type.String()),
	priority: Type.Optional(Type.Enum(ETodoPriority)),
	status: Type.Optional(Type.Enum(ETodoStatus)),
});

export const VUpdatePersonalProjectTodoDtoOut = Type.Object({
	title: Type.String(),
	body: Type.String(),
	progress: Type.String(),
	priority: Type.Enum(ETodoPriority),
	status: Type.Enum(ETodoStatus),
});

// * DELETE TODO
export const VDeletePersonalProjectTodoByIdDtoIn = Type.Object({
	todo_id: Type.String(),
});

// * MAKE IS COMPLETED
export const VMakePersonalProjectTodoIsCompletedDtoIn = Type.Object({
	todo_id: Type.String(),
});
