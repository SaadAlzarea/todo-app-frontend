import { State } from "@/common/state.common";
import { Button } from "@/components/ui/button";

import React from "react";
import UpdatePersonalProjectTodo from "./updatePersonalProjectTodo.component";
import type { IUpdatePersonalProjectTodoDtoIn } from "@/domain/dtos/personal/personal.dto";
import type { UseFormReturn } from "node_modules/react-hook-form/dist/types/form";

interface PersonalProjectTodoActionProps {
	updatePersonalProjectTodoForm: UseFormReturn<IUpdatePersonalProjectTodoDtoIn>;

	updatePersonalProjectTodoHandler: (
		data: IUpdatePersonalProjectTodoDtoIn,
	) => void;

	updateTodoState: boolean;

	setUpdateTodoState: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PersonalProjectTodoAction({
	updatePersonalProjectTodoForm,
	updatePersonalProjectTodoHandler,
	updateTodoState,
	setUpdateTodoState,
}: PersonalProjectTodoActionProps) {
	return (
		<div className=" w-full p-1">
			<div className="w-full">
				<UpdatePersonalProjectTodo
					updatePersonalProjectTodoForm={updatePersonalProjectTodoForm}
					updatePersonalProjectTodoHandler={updatePersonalProjectTodoHandler}
					updateTodoState={updateTodoState}
					setUpdateTodoState={setUpdateTodoState}
				/>
				<Button className="w-full bg-red-500">Delete Todo</Button>
				<Button className="w-full bg-green-500">Mark as Done</Button>
			</div>
		</div>
	);
}
