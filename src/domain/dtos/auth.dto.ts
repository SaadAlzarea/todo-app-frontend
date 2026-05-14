import type { Static } from "@sinclair/typebox";
import type {
	VLoginDtoIn,
	VLoginDtoOut,
	VRegisterDtoIn,
	VRegisterDtoOut,
} from "../validations/auth.validation";

// * REGISTER
export interface IRegisterDtoIn extends Static<typeof VRegisterDtoIn> {}
export interface IRegisterDtoOut extends Static<typeof VRegisterDtoOut> {}

// * LOGIN
export interface ILoginDtoIn extends Static<typeof VLoginDtoIn> {}
export interface ILoginDtoOut extends Static<typeof VLoginDtoOut> {}
