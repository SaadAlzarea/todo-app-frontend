import type { IGetAllUserGroupsByUserIdDtoOut } from "@/domain/dtos/group/group.dto";
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
type AllGroupListProps = {
	getAllUserGroupsData: IGetAllUserGroupsByUserIdDtoOut;
};
export default function AllGroupList({
	getAllUserGroupsData,
}: AllGroupListProps) {
	return (
		<div className="w-full grid grid-cols-1 gap-2 py-2">
			{(getAllUserGroupsData?.length as number) ? (
				getAllUserGroupsData.map((element: any) => (
					<div
						key={element.group_id}
						className="relative border p-2 flex items-start justify-between hover:bg-muted/50 "
					>
						<Link to={``} className="w-full">
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
								<DropdownMenuTrigger asChild>
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
												// setSelectedProjectId(element.project_id);
												// setIsOpenDelete(true);
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
		</div>
	);
}
