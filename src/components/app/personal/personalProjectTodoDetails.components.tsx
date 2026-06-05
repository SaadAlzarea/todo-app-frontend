import { Badge } from "@/components/ui/badge";
import type { IGetPersonalProjectTodoDetailsDtoOut } from "@/domain/dtos/personal/personal.dto";

const priorityVariant: Record<string, "default" | "secondary" | "destructive"> =
	{
		high: "destructive",
		medium: "default",
		low: "secondary",
	};

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
	done: "default",
	in_progress: "secondary",
	pending: "outline",
};

type PersonalProjectForOneTodoDetailsProps = {
	personalProjectTodoDetailsData: IGetPersonalProjectTodoDetailsDtoOut;
};

export default function PersonalProjectForOneTodoDetails({
	personalProjectTodoDetailsData,
}: PersonalProjectForOneTodoDetailsProps) {
	return (
		<div className=" w-full py-3">
			<div className="w-full flex flex-col gap-2">
				<div className="flex items-center justify-start gap-3">
					{personalProjectTodoDetailsData?.priority && (
						<Badge
							variant={
								priorityVariant[personalProjectTodoDetailsData.priority] ??
								"secondary"
							}
							className="text-[12px] px-1.5 py-0"
						>
							{personalProjectTodoDetailsData.priority}
						</Badge>
					)}
					{personalProjectTodoDetailsData?.status && (
						<Badge
							variant={
								statusVariant[personalProjectTodoDetailsData.status] ??
								"outline"
							}
							className="text-[12px] px-1.5 py-0"
						>
							{personalProjectTodoDetailsData.status}
						</Badge>
					)}
				</div>
				<div className="p-3 flex flex-col gap-3 ">
					<div>
						<p className="text-md">Title: </p>
						<div className="border p-3 m-1 w-full">
							<p className=" text-gray-300  w-full">
								{personalProjectTodoDetailsData?.title}
							</p>
						</div>
					</div>
					<div>
						<p className="text-md">Description: </p>
						<div className="border p-3 m-1 w-full">
							<p className=" text-gray-300  w-full">
								{personalProjectTodoDetailsData?.body}
							</p>
						</div>
					</div>
					<div>
						<p className="text-md">Deadline: </p>
						<div className="border p-3 m-1 w-full">
							<p className=" text-gray-300  w-full">
								{new Date(
									personalProjectTodoDetailsData.todo_deadline,
								).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-end gap-3 px-3 text-gray-500 w-full">
					<div>
						<p className="text-xs">Created At: </p>
						<div className="m-1 w-full text-xs">
							<p className="">
								{new Date(
									personalProjectTodoDetailsData.createdAt,
								).toLocaleDateString()}
							</p>
						</div>
					</div>
					<div>
						<p className="text-xs">Updated At: </p>
						<div className="m-1 w-full text-xs">
							<p className="">
								{new Date(
									personalProjectTodoDetailsData.updatedAt,
								).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
