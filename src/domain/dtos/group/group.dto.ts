import type {
	VAddMemberToGroupDtoIn,
	VCreateGroupDtoIn,
	VDeleteGroupDtoIn,
	VGetAllGroupMemberByIdDtoIn,
	VGetAllGroupMemberByIdDtoOut,
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

// * DELETE GROUP
export interface IDeleteGroupDtoIn extends Static<typeof VDeleteGroupDtoIn> {}

// * GET ALL MEMBER
export interface IGetAllGroupMemberByIdDtoIn
	extends Static<typeof VGetAllGroupMemberByIdDtoIn> {}
export interface IGetAllGroupMemberByIdDtoOut
	extends Static<typeof VGetAllGroupMemberByIdDtoOut> {}

// * ADD MEMBER TO GROUP
export interface IAddMemberToGroupDtoIn
	extends Static<typeof VAddMemberToGroupDtoIn> {}
