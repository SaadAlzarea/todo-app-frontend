import { EUserRole } from "@/definition/enums/auth.enum";
import { Type } from "@sinclair/typebox";
import { ValidationMessages } from "../validation.messages";

// * REGISTER
export const VRegisterDtoIn = Type.Object({
	username: Type.String({
		minLength: 3,
		maxLength: 100,
		errorMessage: ValidationMessages.username,
	}),

	email: Type.String({
		pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
		errorMessage: ValidationMessages.email,
	}),

	password: Type.String({
		minLength: 6,
		maxLength: 100,
		errorMessage: ValidationMessages.password,
	}),
	role: Type.Optional(Type.Enum(EUserRole)),
});

export const VRegisterDtoOut = Type.Object({
	token: Type.String(),
	role: Type.Enum(EUserRole),
});

// * LOGIN
export const VLoginDtoIn = Type.Object({
	email: Type.String({
		pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
		errorMessage: ValidationMessages.email,
	}),
	password: Type.String({
		minLength: 6,
		maxLength: 100,
		errorMessage: ValidationMessages.password,
	}),
});

export const VLoginDtoOut = Type.Object({
	token: Type.String(),
	role: Type.Enum(EUserRole),
});
