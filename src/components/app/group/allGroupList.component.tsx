import type {
	IDeleteGroupDtoIn,
	IGetAllUserGroupsByUserIdDtoOut,
} from "@/domain/dtos/group/group.dto";
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { todoAppPath } from "@/domain/paths/appPath/todo.appPath";
import { useGroupStore } from "@/store/groupStore.store";
type AllGroupListProps = {
	getAllUserGroupsData: IGetAllUserGroupsByUserIdDtoOut;
	deleteGroupForm: UseFormReturn<IDeleteGroupDtoIn>;
	deleteGroupHandler: SubmitHandler<IDeleteGroupDtoIn>;
	setDeleteGroup: React.Dispatch<React.SetStateAction<boolean>>;
	deleteGroup: boolean;
};
export default function AllGroupList({
	getAllUserGroupsData,
	deleteGroupForm,
	deleteGroupHandler,
	setDeleteGroup,
	deleteGroup,
}: AllGroupListProps) {
	const { groupDetails } = todoAppPath;
	const { setGroupId, groupId } = useGroupStore();
	return (
		<div className="w-full grid grid-cols-1 gap-2 py-2">
			{(getAllUserGroupsData?.length as number) ? (
				getAllUserGroupsData.map((element: any) => (
					<div
						key={element.group_id}
						className="relative border p-2 flex items-start justify-between hover:bg-muted/50 "
					>
						<Link to={`${groupDetails}/${element.group_id}`} className="w-full">
							<CardHeader className="flex flex-col gap-2 p-2 pr-14">
								<CardTitle>{element.group_name}</CardTitle>

								<CardDescription className="flex text-xs">
									<p className="text-xs">Group id: {element.group_id}</p>
								</CardDescription>
							</CardHeader>
						</Link>

						{/* ACTIONS */}
						<div className="absolute top-2 right-2 z-50">
							<DropdownMenu>
								<DropdownMenuTrigger>
									<Button variant="ghost" size="icon">
										<Ellipsis className="rotate-90 size-4" />
									</Button>
								</DropdownMenuTrigger>

								<DropdownMenuContent align="end">
									<DropdownMenuGroup>
										<DropdownMenuLabel>Setting</DropdownMenuLabel>

										<DropdownMenuItem
											className="text-red-500"
											onClick={() => {
												setDeleteGroup(true);
												setGroupId(element.group_id);
											}}
										>
											Delete
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))
			) : (
				<CardDescription className="text-xs w-full text-center">
					No group found ..
				</CardDescription>
			)}

			<Dialog open={deleteGroup} onOpenChange={setDeleteGroup}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>

						<DialogDescription>This action cannot be undone.</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							variant="destructive"
							onClick={() => {
								deleteGroupHandler({
									group_id: groupId,
								});
							}}
						>
							Sure
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
