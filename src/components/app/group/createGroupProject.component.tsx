import { FormErrorMessage } from "@/common/formError.common";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { ICreatePersonalProjectDtoIn } from "@/domain/dtos/personal/personal.dto";
import { ValidationMessages } from "@/domain/validations/validation.messages";
import { CalendarIcon } from "lucide-react";
import {
	FormProvider,
	type SubmitHandler,
	type UseFormReturn,
} from "react-hook-form";
import type { ICreateGroupProjectDtoIn } from "@/domain/dtos/group/group.dto";

type CreateGroupProjectProps = {
	createGroupProjectHandler: SubmitHandler<ICreateGroupProjectDtoIn>;
	createGroupProjectForm: UseFormReturn<ICreateGroupProjectDtoIn>;
	setCreateGroupProject: React.Dispatch<React.SetStateAction<boolean>>;
	createGroupProject: boolean;
};
export default function CreateGroupProject({
	createGroupProjectHandler,
	createGroupProjectForm,
	setCreateGroupProject,
	createGroupProject,
}: CreateGroupProjectProps) {
	return (
		<Dialog open={createGroupProject} onOpenChange={setCreateGroupProject}>
			<DialogTrigger asChild>
				<Button>Create Personal Project</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<FormProvider {...createGroupProjectForm}>
					<form
						onSubmit={createGroupProjectForm.handleSubmit(
							createGroupProjectHandler,
						)}
					>
						<DialogHeader>
							<DialogTitle>Create New Project</DialogTitle>
							<DialogDescription>
								Make your new project. Click create when you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<FieldGroup className="py-2">
							<FormField
								control={createGroupProjectForm.control}
								name="project_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Project Name</FormLabel>
										<FormControl>
											<Input
												className="bg-background placeholder:text-xs text-sm p-1 "
												placeholder="My new personal project"
												{...field}
											/>
										</FormControl>
										<FormErrorMessage
											error={
												createGroupProjectForm.formState.errors.project_name
													?.message
											}
											message={ValidationMessages.createPersonalProject.name}
										/>
									</FormItem>
								)}
							/>
							<FormField
								control={createGroupProjectForm.control}
								name="project_deadline"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="text-md">Project Deadline</FormLabel>
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
												createGroupProjectForm.formState.errors
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
