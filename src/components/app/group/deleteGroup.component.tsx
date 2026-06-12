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
import type { IDeleteGroupDtoIn } from "@/domain/dtos/group/group.dto";
import type { UseFormReturn, SubmitHandler } from "react-hook-form";

type DeleteGroupProps = {
	deleteGroupForm: UseFormReturn<IDeleteGroupDtoIn>;
	deleteGroupHandler: SubmitHandler<IDeleteGroupDtoIn>;
	setDeleteGroup: React.Dispatch<React.SetStateAction<boolean>>;
	deleteGroup: boolean;
};
export default function DeleteGroup({
	deleteGroupForm,
	deleteGroupHandler,
	setDeleteGroup,
	deleteGroup,
}: DeleteGroupProps) {
	const group_id = deleteGroupForm.getValues().group_id;
	return (
		<Dialog open={deleteGroup} onOpenChange={setDeleteGroup}>
			<DialogTrigger asChild>
				<Button variant={"ghost"} className={"text-red-500"}>
					Delete Group
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Delete Group</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this Group? This action cannot be
						undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						onClick={() => {
							deleteGroupHandler({
								group_id: group_id,
							});
							setDeleteGroup(false);
						}}
						className=" bg-red-500"
					>
						Delete Group
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import type { IDeleteGroupDtoIn } from "@/domain/dtos/group/group.dto";
// import type { SubmitHandler } from "react-hook-form";

// type DeleteGroupProps = {
// 	groupId: string | null;
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// 	deleteGroupHandler: SubmitHandler<IDeleteGroupDtoIn>;
// };

// export default function DeleteGroup({
// 	groupId,
// 	open,
// 	onOpenChange,
// 	deleteGroupHandler,
// }: DeleteGroupProps) {
// 	return (
// 		<Dialog open={open} onOpenChange={onOpenChange}>
// 			<DialogContent className="sm:max-w-sm">
// 				<DialogHeader>
// 					<DialogTitle>Delete Group</DialogTitle>
// 					<DialogDescription>
// 						Are you sure you want to delete this group? This action cannot be
// 						undone.
// 					</DialogDescription>
// 				</DialogHeader>
// 				<DialogFooter>
// 					<DialogClose asChild>
// 						<Button variant="outline">Cancel</Button>
// 					</DialogClose>
// 					<Button
// 						className="bg-red-500 hover:bg-red-600"
// 						onClick={() => {
// 							if (!groupId) return;
// 							deleteGroupHandler({ group_id: groupId });
// 							onOpenChange(false);
// 						}}
// 					>
// 						Delete Group
// 					</Button>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }
