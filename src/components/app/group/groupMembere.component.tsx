import type { IGetAllGroupMemberByIdDtoOut } from "@/domain/dtos/group/group.dto";
import React from "react";
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
type GroupMembersProps = {
	groupMembersData?: IGetAllGroupMemberByIdDtoOut;
};

export default function GroupMembers({ groupMembersData }: GroupMembersProps) {
	return (
		<div className="w-full">
			{(groupMembersData?.length as number) ? (
				groupMembersData?.map((element: any) => (
					<div
						key={element.group_id}
						className="relative border my-3 p-2 flex gep-3 items-start justify-between hover:bg-muted/50 "
					>
						<Link to={``} className="w-full ">
							<CardHeader className="flex flex-col gap-2 p-2 pr-14">
								<CardTitle>{element.username}</CardTitle>

								<CardDescription className="w-full flex text-xs gap-3">
									<p className="text-xs"> {element.group_member_role}</p>
									<p className="text-xs">Email: {element.email}</p>{" "}
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
												// setDeleteGroup(true);
												// setGroupId(element.group_id);
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
					No Members found ..
				</CardDescription>
			)}
		</div>
	);
}
