import { State } from "@/common/state.common";
import { Button } from "@/components/ui/button";

import React from "react";
import UpdatePersonalProjectTodo from "./updatePersonalProjectTodo.component";
import type {
	IDeletePersonalProjectDtoIn,
	IDeletePersonalProjectTodoByIdDtoIn,
	IMakePersonalProjectTodoIsCompletedDtoIn,
	IUpdatePersonalProjectTodoDtoIn,
} from "@/domain/dtos/personal/personal.dto";
import type { UseFormReturn } from "node_modules/react-hook-form/dist/types/form";
import DeletePersonalProjectTodo from "./deletePersonalProjectTodo.component";
import MakePersonalProjectTodoIsCompleted from "./makePersonalProjectTodoIsCompleted.component";

interface PersonalProjectTodoActionProps {
	updatePersonalProjectTodoForm: UseFormReturn<IUpdatePersonalProjectTodoDtoIn>;
	updatePersonalProjectTodoHandler: (
		data: IUpdatePersonalProjectTodoDtoIn,
	) => void;
	updateTodoState: boolean;
	setUpdateTodoState: React.Dispatch<React.SetStateAction<boolean>>;

	deletePersonalProjectTodoHandler: (
		id: IDeletePersonalProjectTodoByIdDtoIn,
	) => void;
	deleteTodoState: boolean;
	setDeleteTodoState: React.Dispatch<React.SetStateAction<boolean>>;
	deletePersonalProjectTodoForm: UseFormReturn<IDeletePersonalProjectTodoByIdDtoIn>;

	makePersonalProjectTodoIsCompletedHandler: (
		data: IMakePersonalProjectTodoIsCompletedDtoIn,
	) => void;
	isCompletedTodoStat: boolean;
	setIsCompletedTodoState: React.Dispatch<React.SetStateAction<boolean>>;
	makePersonalProjectTodoIsCompletedForm: UseFormReturn<IMakePersonalProjectTodoIsCompletedDtoIn>;
}
export default function PersonalProjectTodoAction({
	updatePersonalProjectTodoForm,
	updatePersonalProjectTodoHandler,
	updateTodoState,
	setUpdateTodoState,
	deletePersonalProjectTodoHandler,
	deleteTodoState,
	setDeleteTodoState,
	deletePersonalProjectTodoForm,
	makePersonalProjectTodoIsCompletedHandler,
	isCompletedTodoStat,
	setIsCompletedTodoState,
	makePersonalProjectTodoIsCompletedForm,
}: PersonalProjectTodoActionProps) {
	return (
		<div className="w-full  p-1">
			<div className="w-full flex items-center gap-2 justify-end">
				<UpdatePersonalProjectTodo
					updatePersonalProjectTodoForm={updatePersonalProjectTodoForm}
					updatePersonalProjectTodoHandler={updatePersonalProjectTodoHandler}
					updateTodoState={updateTodoState}
					setUpdateTodoState={setUpdateTodoState}
				/>
				<DeletePersonalProjectTodo
					deletePersonalProjectTodoHandler={deletePersonalProjectTodoHandler}
					deleteTodoState={deleteTodoState}
					setDeleteTodoState={setDeleteTodoState}
					deletePersonalProjectTodoForm={deletePersonalProjectTodoForm}
				/>
				<MakePersonalProjectTodoIsCompleted
					makePersonalProjectTodoIsCompletedHandler={
						makePersonalProjectTodoIsCompletedHandler
					}
					isCompletedTodoStat={isCompletedTodoStat}
					setIsCompletedTodoState={setIsCompletedTodoState}
					makePersonalProjectTodoIsCompletedForm={
						makePersonalProjectTodoIsCompletedForm
					}
				/>
			</div>
		</div>
	);
}
