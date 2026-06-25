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
import { FieldGroup } from "@/components/ui/field";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormErrorMessage } from "@/common/formError.common";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, Filter } from "lucide-react";
import {
	FormProvider,
	type SubmitHandler,
	type UseFormReturn,
} from "react-hook-form";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ICreateAssignTodoInGroupProjectDtoIn } from "@/domain/dtos/group/group.dto";
import { Textarea } from "@/components/ui/textarea";
import { ETodoPriority, ETodoStatus } from "@/definition/enums/todo.emun";
import { format } from "date-fns";
import { useGroupMemberStore } from "@/store/groupMember.store";

type AssignTodoInGroupProjectWithAttachmentProps = {
	assignTodoHandler: SubmitHandler<ICreateAssignTodoInGroupProjectDtoIn>;
	assignTodoForm: UseFormReturn<ICreateAssignTodoInGroupProjectDtoIn>;
	setAssignTodoState: React.Dispatch<React.SetStateAction<boolean>>;
	assignTodoState: boolean;
};

export default function AssignTodoInGroupProjectWithAttachment({
	assignTodoHandler,
	assignTodoForm,
	setAssignTodoState,
	assignTodoState,
}: AssignTodoInGroupProjectWithAttachmentProps) {
	/**
	 * * ZUSTAND
	 */
	const { groupMember } = useGroupMemberStore();
	// const members = groupMember ?? [];
	return (
		<Dialog open={assignTodoState} onOpenChange={setAssignTodoState}>
			<DialogTrigger asChild>
				<Button>Create Todo</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<FormProvider {...assignTodoForm}>
					<form
						onSubmit={assignTodoForm.handleSubmit(
							(data) => {
								console.log("SUCCESS", data);
								assignTodoHandler(data);
							},
							(errors) => {
								console.log("ERRORS", errors);
							},
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
								control={assignTodoForm.control}
								name="assign_to"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Assign to</FormLabel>

										<FormControl>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="outline"
														size="sm"
														className="flex items-center justify-between gap-1 px-2 py-1 text-xs w-full h-9"
													>
														<span className="truncate">
															{field.value?.length
																? (groupMember ?? [])
																		.filter((member) =>
																			field.value?.some(
																				(item) =>
																					item.user_id === member.user_id,
																			),
																		)
																		.map((member) => member.username)
																		.join(", ")
																: "Choose Person"}
														</span>

														<Filter className="h-3.5 w-3.5 shrink-0" />
													</Button>
												</DropdownMenuTrigger>

												<DropdownMenuContent
													align="start"
													className="shadow-lg border p-1 min-w-[250px]"
												>
													{groupMember?.map((member) => {
														const selected = field.value?.some(
															(item) => item.user_id === member.user_id,
														);

														return (
															<DropdownMenuCheckboxItem
																key={member.user_id}
																checked={selected}
																onCheckedChange={(checked) => {
																	const current = field.value || [];

																	if (checked) {
																		field.onChange([
																			...current,
																			{ user_id: member.user_id },
																		]);
																	} else {
																		field.onChange(
																			current.filter(
																				(item) =>
																					item.user_id !== member.user_id,
																			),
																		);
																	}
																}}
															>
																{member.username}
															</DropdownMenuCheckboxItem>
														);
													})}
												</DropdownMenuContent>
											</DropdownMenu>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={assignTodoForm.control}
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
												assignTodoForm.formState.errors
													.project_name?.message
											}
											message={ValidationMessages.createPersonalProject.name}
										/> */}
									</FormItem>
								)}
							/>
							<FormField
								control={assignTodoForm.control}
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
												assignTodoForm.formState.errors
													.project_name?.message
											}
											message={ValidationMessages.createPersonalProject.name}
										/> */}
									</FormItem>
								)}
							/>
							<FormField
								control={assignTodoForm.control}
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
								control={assignTodoForm.control}
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
							<FormField
								control={assignTodoForm.control}
								name="deadline"
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

										{/* <FormErrorMessage
											error={
												assignTodoForm.formState.errors
													.project_deadline?.message
											}
											message={
												ValidationMessages.createPersonalProject.deadline
											}
										/> */}
									</FormItem>
								)}
							/>
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
