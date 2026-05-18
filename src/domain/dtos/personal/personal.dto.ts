import type {
	VCreatePersonalProjectDtoIn,
	VDeletePersonalProjectDtoIn,
	VGetAllPersonalProjectDtoOut,
} from "@/domain/validations/personal/personal.validation";
import type { Static } from "@sinclair/typebox";
import type { JSX } from "react/jsx-runtime";

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
