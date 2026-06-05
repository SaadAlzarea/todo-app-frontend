import { create } from "zustand";
import type { UseFormReturn } from "react-hook-form";
import type { IUpdatePersonalProjectTodoDtoIn } from "@/domain/dtos/personal/personal.dto";

interface PersonalProjectTodoStore {
	updatePersonalProjectTodoHandler:
		| ((data: IUpdatePersonalProjectTodoDtoIn) => void)
		| null;

	setUpdatePersonalProjectTodoHandler: (
		fn: (data: IUpdatePersonalProjectTodoDtoIn) => void,
	) => void;

	updatePersonalProjectTodoForm: UseFormReturn<IUpdatePersonalProjectTodoDtoIn> | null;

	setUpdatePersonalProjectTodoForm: (
		form: UseFormReturn<IUpdatePersonalProjectTodoDtoIn>,
	) => void;

	updateTodoState: boolean;

	setUpdateTodoState: (state: boolean) => void;
}

export const usePersonalProjectTodoStore = create<PersonalProjectTodoStore>(
	(set) => ({
		updatePersonalProjectTodoHandler: null,

		setUpdatePersonalProjectTodoHandler: (fn) =>
			set({
				updatePersonalProjectTodoHandler: fn,
			}),

		updatePersonalProjectTodoForm: null,

		setUpdatePersonalProjectTodoForm: (form) =>
			set({
				updatePersonalProjectTodoForm: form,
			}),

		updateTodoState: false,

		setUpdateTodoState: (state) =>
			set({
				updateTodoState: state,
			}),
	}),
);
