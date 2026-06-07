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
import type {
	IDeletePersonalProjectTodoByIdDtoIn,
	IMakePersonalProjectTodoIsCompletedDtoIn,
} from "@/domain/dtos/personal/personal.dto";

import type { UseFormReturn } from "react-hook-form";

type MakePersonalProjectTodoIsCompletedProps = {
	makePersonalProjectTodoIsCompletedHandler: (
		data: IMakePersonalProjectTodoIsCompletedDtoIn,
	) => void;
	isCompletedTodoStat: boolean;
	setIsCompletedTodoState: React.Dispatch<React.SetStateAction<boolean>>;
	makePersonalProjectTodoIsCompletedForm: UseFormReturn<IMakePersonalProjectTodoIsCompletedDtoIn>;
};
export default function MakePersonalProjectTodoIsCompleted({
	makePersonalProjectTodoIsCompletedHandler,
	isCompletedTodoStat,
	setIsCompletedTodoState,
	makePersonalProjectTodoIsCompletedForm,
}: MakePersonalProjectTodoIsCompletedProps) {
	const todoId = makePersonalProjectTodoIsCompletedForm.getValues("todo_id");

	return (
		<Dialog open={isCompletedTodoStat} onOpenChange={setIsCompletedTodoState}>
			<DialogTrigger asChild>
				<Button className=" bg-green-500">Make Todo Completed</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Make Done</DialogTitle>
					<DialogDescription>
						Are you sure you want to make this todo done? This action cannot be
						undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						onClick={() => {
							makePersonalProjectTodoIsCompletedHandler({
								todo_id: todoId,
							});
							setIsCompletedTodoState(false);
						}}
						className=" bg-green-500"
					>
						Make Todo Done
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
