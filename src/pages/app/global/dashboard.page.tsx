import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import React from "react";

export default function Dashboard() {
	const statisticData = [
		{ label: "Total Todos", value: "—" },
		{ label: "Completed Todos", value: "—" },
		{ label: "Pending Todos", value: "—" },
		{ label: "Assigned Todos", value: "—" },
		{ label: "Number of personal Projects", value: "—" },
		{ label: "Number of Organizations Projects", value: "—" },
		{ label: "Number of Organizations", value: "—" },
	];
	return (
		<div className=" flex flex-col gap-3">
			<div className="w-full border p-2 flex justify-between items-center">
				<CardHeader className="w-full">
					<CardTitle>Dashboard</CardTitle>
					<CardDescription>
						Here you can see your recent activities and updates.
					</CardDescription>
				</CardHeader>
				<CardContent className=" flex gap-2 ">
					<Button>Create Personal Project</Button>
					<Button>Create Organize Project</Button>
				</CardContent>
			</div>
			<div className=" w-full border p-2 flex flex-col justify-between items-center gap-2 ">
				<CardHeader className="w-full">
					<CardTitle>Statistic</CardTitle>
					<CardDescription>
						Here you can see your activities and updates.
					</CardDescription>
				</CardHeader>

				<div className=" flex flex-wrap gap-2">
					{statisticData.map((state) => {
						return (
							<div
								key={state.label}
								className="bg-muted  p-3.5 flex flex-col gap-1 hover:bg-muted/80 transition-colors"
							>
								<div
									key={state.label}
									className="flex flex flex-col justify-between"
								>
									<span className="text-[11px] text-muted-foreground uppercase tracking-wide">
										{state.label}
									</span>
									<span className="text-lg font-medium text-foreground">
										{state.value}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
