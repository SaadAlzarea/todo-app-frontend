import type {
	VCreateGroupDtoIn,
	VGetAllUserGroupsByUserIdDtoIn,
	VGetAllUserGroupsByUserIdDtoOut,
} from "@/domain/validations/group/group.validation";
import type { Static } from "@sinclair/typebox";

// * CREATE GROUP
export interface ICreateGroupDtoIn extends Static<typeof VCreateGroupDtoIn> {}

// * GET ALL GROUPS
export interface IGetAllUserGroupsByUserIdDtoIn
	extends Static<typeof VGetAllUserGroupsByUserIdDtoIn> {}
export interface IGetAllUserGroupsByUserIdDtoOut
	extends Static<typeof VGetAllUserGroupsByUserIdDtoOut> {}
