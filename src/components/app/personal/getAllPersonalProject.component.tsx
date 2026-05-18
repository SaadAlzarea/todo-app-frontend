import { State } from "@/common/state.common";
import { Button } from "@/components/ui/button";
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
import type {
	IDeletePersonalProjectDtoIn,
	IGetAllPersonalProjectDtoOut,
} from "@/domain/dtos/personal/personal.dto";
import { todoAppPath } from "@/domain/paths/appPath/todo.appPath";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export type getAllPersonalProjectProps = {
	allPersonalProjectData?: IGetAllPersonalProjectDtoOut;
	isLoading: boolean;
	error: any;
	refetch: () => void;
	deletePersonalProjectHandler: (data: IDeletePersonalProjectDtoIn) => void;
};

export default function GetAllPersonalProject({
	allPersonalProjectData,
	isLoading,
	error,
	refetch,
	deletePersonalProjectHandler,
}: getAllPersonalProjectProps) {
	/**
	 * * STATE
	 */
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
		null,
	);

	/**
	 * * NAVIGATE
	 */
	const { personalProjectTodo } = todoAppPath;

	return (
		<State isLoading={isLoading} error={error} onRetry={refetch}>
			<div className="w-full grid grid-cols-1 gap-2 py-2">
				{allPersonalProjectData ? (
					allPersonalProjectData.map((element) => (
						<div
							key={element.project_id}
							className="relative border p-2 flex items-start justify-between hover:bg-muted/50 "
						>
							<Link
								to={`${personalProjectTodo}/${element.project_id}`}
								className="w-full"
							>
								<CardHeader className="flex flex-col gap-2 p-2 pr-14">
									<CardTitle>{element.project_name}</CardTitle>

									<CardDescription className="flex text-xs">
										<p>Created At: {element.createdAt}</p>

										<p className="ml-2">
											Deadline At: {element.project_deadline}
										</p>
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
													setSelectedProjectId(element.project_id);
													setIsOpenDelete(true);
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
					<CardDescription className="text-xs">
						No projects found
					</CardDescription>
				)}

				{/* DELETE DIALOG (GLOBAL SINGLE MODAL) */}
				<Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>

							<DialogDescription>
								This action cannot be undone.
							</DialogDescription>
						</DialogHeader>

						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>

							<Button
								variant="destructive"
								onClick={() => {
									if (selectedProjectId) {
										deletePersonalProjectHandler({
											project_id: selectedProjectId,
										});
									}

									setIsOpenDelete(false);
									setSelectedProjectId(null);
								}}
							>
								Sure
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</State>
	);
}
