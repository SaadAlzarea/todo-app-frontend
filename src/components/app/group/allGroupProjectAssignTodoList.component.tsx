import TodoCompletedBadge from "@/components/common/todoCompletedBadge.common";
import TodoPriorityBadge from "@/components/common/todoPriorityBadge.common";
import TodoStatusBadge from "@/components/common/todoStatusBadge.common";
import { Badge } from "@/components/ui/badge";
import { CardDescription } from "@/components/ui/card";
import type { IGetAllAssignTodoInGroupProjectListDtoOut } from "@/domain/dtos/group/group.dto";
import React from "react";
import { Link } from "react-router-dom";

// --- Component ---

type AllGroupProjectAssignTodoListProps = {
	allAssignTodoData:
		| IGetAllAssignTodoInGroupProjectListDtoOut
		| null
		| undefined;
	buildTodoPath: (assignTodoId: string) => string;
};

export default function AllGroupProjectAssignTodoList({
	allAssignTodoData,
	buildTodoPath,
}: AllGroupProjectAssignTodoListProps) {
	const todos = allAssignTodoData;
	const hasTodos = Array.isArray(todos) && todos.length > 0;

	if (!hasTodos) {
		return (
			<div className="w-full flex flex-col items-center justify-center py-12 gap-2">
				<i className="ti ti-checklist text-muted-foreground text-3xl" />
				<CardDescription className="text-xs">No todos found</CardDescription>
			</div>
		);
	}

	return (
		<div className="w-full py-2">
			<div className="w-full grid grid-cols-2 gap-2 py-2">
				{todos.map((todo) => (
					<Link
						key={todo.assign_todo_id}
						to={buildTodoPath(todo.assign_todo_id)}
						aria-disabled={todo.isCompleted}
						className={`flex items-center w-full justify-between px-4 py-3 border transition-colors ${
							todo.isCompleted
								? "opacity-50 pointer-events-none cursor-not-allowed"
								: "hover:bg-muted/50"
						}`}
					>
						<div className="flex flex-col gap-1 w-full">
							<span className="text-sm font-medium text-foreground truncate">
								{todo.title}
							</span>

							<div className="flex items-center gap-1.5 flex-wrap">
								<TodoPriorityBadge priority={todo.priority} />
								<TodoStatusBadge status={todo.status} />
								<TodoCompletedBadge isCompleted={todo.isCompleted} />
							</div>

							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<span>From: {todo.assign_from_username ?? "Unknown"}</span>
								<span>·</span>
								<span>To: {todo.assign_to_username ?? "Unknown"}</span>
							</div>

							<p className="text-xs text-muted-foreground">
								Due{" "}
								{todo.deadline
									? new Date(todo.deadline).toLocaleDateString()
									: "No deadline"}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
