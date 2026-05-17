import { State } from "@/common/state.common";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IGetAllPersonalProjectDtoOut } from "@/domain/dtos/personal/personal.dto";
import {
	BellDotIcon,
	DotIcon,
	DotSquareIcon,
	Ellipsis,
	SquareCenterlineDashedVertical,
} from "lucide-react";
import React from "react";

export type getAllPersonalProjectProps = {
	allPersonalProjectData?: IGetAllPersonalProjectDtoOut;
	isLoading: boolean;
	error: any;
	refetch: () => void;
};

export default function GetAllPersonalProject({
	allPersonalProjectData,
	isLoading,
	error,
	refetch,
}: getAllPersonalProjectProps) {
	// console.log(allPersonalProjectData?.data);
	return (
		<State isLoading={isLoading} error={error} onRetry={refetch}>
			<div className="w-full grid grid-cols-1 items-center justify-center gap-2 py-2">
				{allPersonalProjectData ? (
					allPersonalProjectData.map((element) => (
						<div key={element.project_id} className="border p-2 flex">
							<CardHeader className="w-full felx flex-col gap-2 p-2">
								<CardTitle>{element.project_name}</CardTitle>
								<CardDescription className="flex text-xs">
									<p> Created At: {element.createdAt}</p>
									<p>&nbsp;&nbsp; Deadline At: {element.project_deadline}</p>
								</CardDescription>
							</CardHeader>
							<div className="bg-muted h-7 p-2 flex flex-col gap-1 hover:bg-muted/80 transition-colors">
								<Ellipsis className=" rotate-90 size-3 " />
							</div>
						</div>
					))
				) : (
					<CardDescription className="text-xs ">
						No projects found
					</CardDescription>
				)}
			</div>
		</State>
	);
}
