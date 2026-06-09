import React from "react";
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
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
	FormProvider,
	type SubmitHandler,
	type UseFormReturn,
} from "react-hook-form";
import type { ICreateGroupDtoIn } from "@/domain/dtos/group/group.dto";

type CreateNewGroupProps = {
	createGroupHandler: SubmitHandler<ICreateGroupDtoIn>;
	createGroupForm: UseFormReturn<ICreateGroupDtoIn>;
	createNewGroup: boolean;
	setCreateNewGroup: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CreateNewGroup({
	createGroupHandler,
	createGroupForm,
	createNewGroup,
	setCreateNewGroup,
}: CreateNewGroupProps) {
	return (
		<div>
			<Dialog open={createNewGroup} onOpenChange={setCreateNewGroup}>
				<DialogTrigger asChild>
					<Button>Create Group</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<FormProvider {...createGroupForm}>
						<form onSubmit={createGroupForm.handleSubmit(createGroupHandler)}>
							<DialogHeader>
								<DialogTitle>Create New Group</DialogTitle>
								<DialogDescription>
									Make your new group. Click create when you&apos;re done.
								</DialogDescription>
							</DialogHeader>
							<FieldGroup className="py-2">
								<FormField
									control={createGroupForm.control}
									name="group_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-md">Group Name</FormLabel>
											<FormControl>
												<Input
													className="bg-background placeholder:text-xs text-sm p-1 "
													placeholder="My new personal project"
													{...field}
												/>
											</FormControl>
											{/* <FormErrorMessage
											error={
												createGroupForm.formState.errors
													.project_name?.message
											}
											message={ValidationMessages.createPersonalProject.name}
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
		</div>
	);
}
