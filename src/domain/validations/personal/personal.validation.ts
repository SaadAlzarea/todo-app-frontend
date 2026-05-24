import { ETodoPriority, ETodoStatus } from "@/definition/enums/todo.emun";
import { Type } from "@sinclair/typebox";
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

// * CREATE NEW TODO INSIDE PERSONAL PROJECT
export const VCreateNewProjectTodoDoIn = Type.Object({
	project_id: Type.String(),
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
