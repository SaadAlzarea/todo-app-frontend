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
