import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { IGetAllGroupProjectsDtoIn } from "@/domain/dtos/group/group.dto";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { todoAppPath } from "@/domain/paths/appPath/todo.appPath";

type AllGroupProjectsProps = {
	allGroupProjectsData: IGetAllGroupProjectsDtoIn;
};
export default function AllGroupProjects({
	allGroupProjectsData,
}: AllGroupProjectsProps) {
	const { projectGroupTodos } = todoAppPath;
	return (
		<div className="w-full grid grid-cols-1 gap-2 py-2">
			{(allGroupProjectsData?.length as number) ? (
				allGroupProjectsData.map((element: any) => (
					<div
						key={element.group_id}
						className="relative border p-2 flex items-start justify-between hover:bg-muted/50 "
					>
						<Link
							to={`${projectGroupTodos}/${element.project_id}`}
							className="w-full"
						>
							<CardHeader className="flex flex-col gap-2 p-2 pr-14">
								<CardTitle>{element.project_name}</CardTitle>

								<CardDescription className="flex text-xs">
									<p className="text-xs">
										{" "}
										Deadline: {element.project_deadline}
									</p>
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
					No group found ..
				</CardDescription>
			)}
		</div>
	);
}
