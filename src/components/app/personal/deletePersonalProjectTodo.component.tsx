import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { IDeletePersonalProjectTodoByIdDtoIn } from "@/domain/dtos/personal/personal.dto";

import type { UseFormReturn } from "react-hook-form";

type DeletePersonalProjectTodoProps = {
	deletePersonalProjectTodoHandler: (
		id: IDeletePersonalProjectTodoByIdDtoIn,
	) => void;
	deleteTodoState: boolean;
	setDeleteTodoState: React.Dispatch<React.SetStateAction<boolean>>;
	deletePersonalProjectTodoForm: UseFormReturn<IDeletePersonalProjectTodoByIdDtoIn>;
};
export default function DeletePersonalProjectTodo({
	deletePersonalProjectTodoHandler,
	deleteTodoState,
	setDeleteTodoState,
	deletePersonalProjectTodoForm,
}: DeletePersonalProjectTodoProps) {
	const todoId = deletePersonalProjectTodoForm.getValues("todo_id");

	return (
		<Dialog open={deleteTodoState} onOpenChange={setDeleteTodoState}>
			<DialogTrigger asChild>
				<Button className=" bg-red-500">Delete Todo</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Delete Todo</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this todo? This action cannot be
						undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						onClick={() => {
							deletePersonalProjectTodoHandler({
								todo_id: todoId,
							});
							setDeleteTodoState(false);
						}}
						className=" bg-red-500"
					>
						Delete Todo
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
