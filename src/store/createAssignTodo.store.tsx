import type { ICreateAssignTodoInGroupProjectDtoIn } from "@/domain/dtos/group/group.dto";
import { create } from "zustand";

interface ICreateAssignTodo {
	assignTodoInfo: Partial<ICreateAssignTodoInGroupProjectDtoIn>;

	setAssignTodoInfo: (
		assignTodoInfo: Partial<ICreateAssignTodoInGroupProjectDtoIn>,
	) => void;
}

export const useAssignTodoInfo = create<ICreateAssignTodo>((set) => ({
	assignTodoInfo: {},

	setAssignTodoInfo: (assignTodoInfo) =>
		set((state) => ({
			assignTodoInfo: {
				...state.assignTodoInfo,
				...assignTodoInfo,
			},
		})),
}));
