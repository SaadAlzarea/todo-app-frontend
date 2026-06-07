import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { usePersonalProjectTodoStore } from "@/store/personalProjectTodoAction.store";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FieldGroup } from "@/components/ui/field";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CalendarIcon, Filter } from "lucide-react";
import React from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { ETodoPriority, ETodoStatus } from "@/definition/enums/todo.emun";
import { format } from "date-fns";
import type { IUpdatePersonalProjectTodoDtoIn } from "@/domain/dtos/personal/personal.dto";

interface UpdatePersonalProjectTodoProps {
	updatePersonalProjectTodoForm: UseFormReturn<IUpdatePersonalProjectTodoDtoIn>;
	updatePersonalProjectTodoHandler: (
		data: IUpdatePersonalProjectTodoDtoIn,
	) => void;
	updateTodoState: boolean;
	setUpdateTodoState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdatePersonalProjectTodo({
	updatePersonalProjectTodoForm,
	updatePersonalProjectTodoHandler,
	updateTodoState,
	setUpdateTodoState,
}: UpdatePersonalProjectTodoProps) {
	return (
		<Dialog open={updateTodoState} onOpenChange={setUpdateTodoState}>
			<DialogTrigger asChild className={""}>
				<Button className={""}>Update Todo</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<FormProvider {...updatePersonalProjectTodoForm}>
					<form
						onSubmit={updatePersonalProjectTodoForm.handleSubmit(
							updatePersonalProjectTodoHandler,
						)}
					>
						<DialogHeader>
							<DialogTitle>Create New Personal Project</DialogTitle>
							<DialogDescription>
								Make your new personal project. Click create when you&apos;re
								done.
							</DialogDescription>
						</DialogHeader>
						<FieldGroup className="py-2">
							<FormField
								control={updatePersonalProjectTodoForm.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Title</FormLabel>
										<FormControl>
											<Input
												className="bg-background placeholder:text-xs text-sm p-1 "
												placeholder="My new personal project"
												{...field}
											/>
										</FormControl>
										{/* <FormErrorMessage
											error={
												updatePersonalProjectTodoForm.formState.errors
													.project_name?.message
											}
											message={ValidationMessages.createPersonalProject.name}
										/> */}
									</FormItem>
								)}
							/>
							<FormField
								control={updatePersonalProjectTodoForm.control}
								name="body"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Body</FormLabel>
										<FormControl>
											<Textarea
												className="bg-background placeholder:text-xs text-sm p-1 "
												placeholder="My new personal project"
												{...field}
											/>
										</FormControl>
										{/* <FormErrorMessage
											error={
												updatePersonalProjectTodoForm.formState.errors
													.project_name?.message
											}
											message={ValidationMessages.createPersonalProject.name}
										/> */}
									</FormItem>
								)}
							/>
							<FormField
								control={updatePersonalProjectTodoForm.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Status</FormLabel>
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
																: "Choose Status"}
														</span>
														<Filter className="h-3.5 w-3.5" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													align="start"
													className="shadow-lg border p-1 w-full "
												>
													{Object.values(ETodoStatus).map((status) => (
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updatePersonalProjectTodoForm.control}
								name="priority"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Priority</FormLabel>
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
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* <FormField
								control={updatePersonalProjectTodoForm.control}
								name="todo_deadline"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="text-md">Todo Deadline</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														className="w-full justify-start text-left font-normal"
													>
														<CalendarIcon className="mr-2 h-4 w-4" />

														{field.value ? (
															format(new Date(field.value), "PPP")
														) : (
															<span>Pick a deadline</span>
														)}
													</Button>
												</FormControl>
											</PopoverTrigger>

											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={
														field.value ? new Date(field.value) : undefined
													}
													onSelect={(date) =>
														field.onChange(date?.toISOString() || "")
													}
													// initialFocus
												/>
											</PopoverContent>
										</Popover>

									</FormItem>
								)}
							/> */}
						</FieldGroup>
						<DialogFooter className="pt-3">
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
