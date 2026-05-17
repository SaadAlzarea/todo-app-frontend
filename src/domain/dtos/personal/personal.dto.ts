import type {
	VCreatePersonalProjectDtoIn,
	VGetAllPersonalProjectDtoOut,
} from "@/domain/validations/personal/personal.validation";
import type { Static } from "@sinclair/typebox";

// * CREATE PERSONAL PROJECT
export interface ICreatePersonalProjectDtoIn
	extends Static<typeof VCreatePersonalProjectDtoIn> {}

// * GET ALL PROJECTS
export interface IGetAllPersonalProjectDtoOut
	extends Static<typeof VGetAllPersonalProjectDtoOut> {}
