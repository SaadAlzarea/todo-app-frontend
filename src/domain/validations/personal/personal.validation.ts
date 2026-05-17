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
