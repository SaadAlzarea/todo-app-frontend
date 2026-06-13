import { EGroupMemberRole } from "@/definition/enums/todo.emun";
import { Type } from "@sinclair/typebox";

// * CREATE GROUP
export const VCreateGroupDtoIn = Type.Object({
	group_name: Type.String(),
});

// * GET ALL GROUPS INFO
export const VGetAllUserGroupsByUserIdDtoIn = Type.Object({
	user_id: Type.String(),
});

export const VGetAllUserGroupsByUserIdDtoOut = Type.Object({
	data: Type.Object({
		data: Type.Array(
			Type.Object({
				group_name: Type.String(),
				group_id: Type.String(),
			}),
		),
	}),
});

// * DELETE GROUP
export const VDeleteGroupDtoIn = Type.Object({
	group_id: Type.String(),
});

// * GET ALL MEMBER IN GROUP
export const VGetAllGroupMemberByIdDtoIn = Type.Object({
	group_id: Type.String(),
});

export const VGetAllGroupMemberByIdDtoOut = Type.Array(
	Type.Object({
		email: Type.String(),
		username: Type.String(),
		group_member_id: Type.String(),
		group_id: Type.String(),
		user_id: Type.String(),
		group_member_role: Type.Enum(EGroupMemberRole),
	}),
);

// * ADD MEMBER TO GROUP
export const VAddMemberToGroupDtoIn = Type.Object({
	member_email: Type.String(),
	group_id: Type.String(),
});

// * DELETE MEMBER
export const VDeleteMemberFromGroupDtoIn = Type.Object({
	member_user_id: Type.String(),
	group_id: Type.String(),
});

// * GET ALL GROUP PROJECTS
export const VGetAllGroupProjectsDtoIn = Type.Object({
	group_id: Type.String(),
});

export const VGetAllGroupProjectsDtoOut = Type.Array(
	Type.Object({
		project_name: Type.String(),
		project_deadline: Type.String(),
		created_by: Type.String(),
		username: Type.Optional(Type.String()),
	}),
);

// * CREATE GROUP PROJECT
export const VCreateGroupProjectDtoIn = Type.Object({
	project_name: Type.String(),
	group_id: Type.String(),
	project_deadline: Type.String(),
});

export const VCreateGroupProjectDtoOut = Type.Object({
	project_id: Type.String(),
	project_name: Type.String(),
	group_id: Type.String(),
	created_by: Type.String(),
	project_deadline: Type.Date(),
	createdAt: Type.Date(),
	updatedAt: Type.Date(),
});
