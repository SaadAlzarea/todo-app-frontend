import { State } from "@/common/state.common";
import { Button } from "@/components/ui/button";

import React from "react";

export default function PersonalProjectTodoAction() {
	return (
		<div className=" w-full p-1">
			<div className="w-full">
				<Button className="w-full ">Update Todo</Button>
				<Button className="w-full bg-red-500">Delete Todo</Button>
				<Button className="w-full bg-green-500">Mark as Done</Button>
			</div>
		</div>
	);
}
