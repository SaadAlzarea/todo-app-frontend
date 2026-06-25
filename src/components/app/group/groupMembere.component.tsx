import type {
	IDeleteMemberFromGroupDtoIn,
	IGetAllGroupMemberByIdDtoOut,
} from "@/domain/dtos/group/group.dto";
import React, { useEffect, useState } from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ellipsis } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import type { SubmitHandler, UseFormReturn } from "react-hook-form";
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
import { useGroupMemberStore } from "@/store/groupMember.store";
type GroupMembersProps = {
	groupMembersData?: IGetAllGroupMemberByIdDtoOut;
	//
	deleteMemberFromGroupHandler: SubmitHandler<IDeleteMemberFromGroupDtoIn>;
	deleteMemberForm: UseFormReturn<IDeleteMemberFromGroupDtoIn>;
	deleteMember: boolean;
	setDeleteMember: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GroupMembers({
	groupMembersData,
	deleteMemberFromGroupHandler,
	deleteMemberForm,
	setDeleteMember,
	deleteMember,
}: GroupMembersProps) {
	/**
	 * * GLOBAL
	 */
	const [memberUserId, setMemberUserId] = useState("");

	return (
		<div className="w-full">
			{(groupMembersData?.length as number) ? (
				groupMembersData?.map((element: any) => {
					return (
						<div
							key={element.group_id}
							className="relative border my-3 p-2 flex gep-3 items-start justify-between hover:bg-muted/50 "
						>
							<Link to={``} className="w-full ">
								<CardHeader className="flex flex-col gap-2 p-2 pr-14">
									<CardTitle>{element.username}</CardTitle>

									<CardDescription className="w-full flex text-xs gap-3">
										<p className="text-xs"> {element.group_member_role}</p>
										<p className="text-xs">Email: {element.email}</p>
									</CardDescription>
								</CardHeader>
							</Link>

							{/* ACTIONS */}
							<div className="absolute top-2 right-2 z-50 flex flex-col items-end justify-between gap-2">
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
													setDeleteMember(true);
													setMemberUserId(element.user_id);
												}}
											>
												Delete
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					);
				})
			) : (
				<CardDescription className="text-xs w-full text-center">
					No Members found ..
				</CardDescription>
			)}

			<Dialog open={deleteMember} onOpenChange={setDeleteMember}>
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
								deleteMemberFromGroupHandler({
									group_id: deleteMemberForm.getValues().group_id,
									member_user_id: memberUserId,
								});
								setDeleteMember(false);
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
