import { State } from "@/common/state.common";
import { CardDescription } from "@/components/ui/card";
import type { IGetAllPersonalProjectTodosWithFilterDtoIn } from "@/domain/dtos/personal/personal.dto";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useEffect, type ReactElement } from "react";
import {
	FormProvider,
	type SubmitHandler,
	type UseFormReturn,
} from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormErrorMessage } from "@/common/formError.common";
import { ValidationMessages } from "@/domain/validations/validation.messages";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { ETodoPriority, ETodoStatus } from "@/definition/enums/todo.emun";
import { personalProjectTodoIntegrationPath } from "@/domain/paths/apiPath/personal/personalProject.path";
import { todoAppPath } from "@/domain/paths/appPath/todo.appPath";
import TodoPriorityBadge from "@/components/common/todoPriorityBadge.common";
import TodoStatusBadge from "@/components/common/todoStatusBadge.common";
import TodoCompletedBadge from "@/components/common/todoCompletedBadge.common";

type AllPersonalProjectTodoProps = {
	allPersonalTodoData?: { data: IGetAllPersonalProjectTodosWithFilterDtoIn[] };
	allPersonalTodoIsLoading: boolean;
	allPersonalTodoError: any;
	allPersonalTodoRefetch: () => void;
	clearFilter: () => void;
	getAllPersonalProjectTodoWithFilterHandler: SubmitHandler<IGetAllPersonalProjectTodosWithFilterDtoIn>;
	isChanged: () => boolean;
	filter: ReactElement;
	allPersonalProjectTodoForm: UseFormReturn<IGetAllPersonalProjectTodosWithFilterDtoIn>;
	projectId: string;
};

export default function AllPersonalProjectTodo({
	allPersonalTodoData,
	allPersonalTodoIsLoading,
	allPersonalTodoError,
	allPersonalTodoRefetch,
	allPersonalProjectTodoForm,
	getAllPersonalProjectTodoWithFilterHandler,
	clearFilter,
	isChanged,
	projectId,
}: AllPersonalProjectTodoProps) {
	const { personalProjectTodoDetails } = todoAppPath;
	useEffect(() => {
		allPersonalTodoRefetch();
	}, [allPersonalProjectTodoForm.watch()]);

	return (
		<State
			isLoading={allPersonalTodoIsLoading}
			error={allPersonalTodoError}
			onRetry={allPersonalTodoRefetch}
		>
			<div className="flex flex-col  gap-2 py-2 w-full">
				<div className="border px-4 py-3 w-full">
					<FormProvider {...allPersonalProjectTodoForm}>
						<form
							onSubmit={allPersonalProjectTodoForm.handleSubmit(
								getAllPersonalProjectTodoWithFilterHandler,
							)}
							className="flex"
						>
							<FieldGroup className="w-full">
								<Label>Filters</Label>
								<div className="min-w-full  flex items-center  gap-2  ">
									<FormField
										control={allPersonalProjectTodoForm.control}
										name="todo_id"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														className=" placeholder:text-xs text-sm w-full p-1 h-9"
														placeholder="Todo ID"
														{...field}
													/>
												</FormControl>
												{/* <FormErrorMessage
												error={
													allPersonalProjectTodoForm.formState.errors
														.project_name?.message
												}
												message={ValidationMessages.createPersonalProject.name}
											/> */}
											</FormItem>
										)}
									/>
									<FormField
										control={allPersonalProjectTodoForm.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												{/* <FormLabel className="text-md">Status</FormLabel> */}
												<FormControl>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="outline"
																size="sm"
																className="flex items-center gap-1 px-2 py-1 w-full  text-xs h-9"
															>
																<span>
																	{field.value
																		? field.value
																				.replace("_", " ")
																				.toUpperCase()
																				.slice(0, 21) +
																			(field.value.length > 20 ? "..." : "")
																		: "Choose Status"}
																</span>
																<Filter className="h-3.5 w-3.5" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align="start"
															className="shadow-lg border p-1 "
														>
															{Object.values(ETodoStatus).map((status) => (
																<DropdownMenuItem
																	key={status}
																	className="cursor-pointer px-3 py-1.5 text-sm w-full  hover:bg-gray-100 rounded"
																	onClick={() => field.onChange(status)}
																>
																	{status.replace("_", " ").toUpperCase()}
																</DropdownMenuItem>
															))}
														</DropdownMenuContent>
													</DropdownMenu>
												</FormControl>
												{/* <FormMessage /> */}
											</FormItem>
										)}
									/>
									<FormField
										control={allPersonalProjectTodoForm.control}
										name="priority"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button
																variant="outline"
																size="sm"
																className="flex items-center gap-1 px-2 py-1 text-xs w-full h-9"
															>
																<span>
																	{field.value
																		? field.value
																				.replace("_", " ")
																				.toUpperCase()
																				.slice(0, 21) +
																			(field.value.length > 20 ? "..." : "")
																		: "Choose priority"}
																</span>
																<Filter className="h-3.5 w-3.5" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent
															align="start"
															className="  shadow-lg border p-1 w-full "
														>
															{Object.values(ETodoPriority).map((status) => (
																<DropdownMenuItem
																	key={status}
																	className="cursor-pointer px-3 py-1.5 text-sm hover:bg-gray-100 rounded"
																	onClick={() => field.onChange(status)}
																>
																	{status.replace("_", " ").toUpperCase()}
																</DropdownMenuItem>
															))}
														</DropdownMenuContent>
													</DropdownMenu>
												</FormControl>
												{/* <FormMessage /> */}
											</FormItem>
										)}
									/>
								</div>
							</FieldGroup>
							<div className="flex flex-col items-center justify-center gap-2">
								<Button
									className={"w-18"}
									type="submit"
									disabled={isChanged() === true}
								>
									Search
								</Button>
								<Button
									className={"w-18"}
									type="button"
									variant="outline"
									onClick={clearFilter}
								>
									Clear
								</Button>
							</div>
						</form>
					</FormProvider>
				</div>
				<div className="w-full py-2">
					{allPersonalTodoData?.data?.length ? (
						<div className="w-full grid grid-cols-2 gap-2 py-2">
							{allPersonalTodoData.data.map((todo) => (
								<Link
									key={todo.todo_id}
									to={`${personalProjectTodoDetails}/${todo.todo_id}`}
									className={`flex items-center w-full justify-between px-4 py-3 border transition-colors ${
										todo?.isCompleted
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
									</div>
									{/* <i className="ti ti-chevron-right text-muted-foreground text-base shrink-0 ml-3" /> */}
								</Link>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-12 gap-2">
							<i className="ti ti-checklist text-muted-foreground text-3xl" />
							<CardDescription className="text-xs">
								No todos found
							</CardDescription>
						</div>
					)}
				</div>
			</div>
		</State>
	);
}
