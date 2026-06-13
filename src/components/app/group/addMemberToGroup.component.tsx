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
import { FieldGroup } from "@/components/ui/field";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { IAddMemberToGroupDtoIn } from "@/domain/dtos/group/group.dto";
import { Input } from "@base-ui/react";
import {
	FormProvider,
	type SubmitHandler,
	type UseFormReturn,
} from "react-hook-form";

type AddMemberToGroupProps = {
	addMemberFrom: UseFormReturn<IAddMemberToGroupDtoIn>;
	addedMemberToGroupHandler: SubmitHandler<IAddMemberToGroupDtoIn>;
	setAddMember: React.Dispatch<React.SetStateAction<boolean>>;
	addMember: boolean;
};
export default function AddMemberToGroup({
	addMemberFrom,
	addedMemberToGroupHandler,
	setAddMember,
	addMember,
}: AddMemberToGroupProps) {
	return (
		<Dialog open={addMember} onOpenChange={setAddMember}>
			<DialogTrigger asChild>
				<Button>Add Member</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<FormProvider {...addMemberFrom}>
					<form
						onSubmit={addMemberFrom.handleSubmit(addedMemberToGroupHandler)}
					>
						<DialogHeader>
							<DialogTitle>Create New Group</DialogTitle>
							<DialogDescription>
								Make your new group. Click create when you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<FieldGroup className="py-2">
							<FormField
								control={addMemberFrom.control}
								name="member_email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Member Email</FormLabel>
										<FormControl>
											<Input
												className="bg-background placeholder:text-xs text-sm p-1 "
												placeholder="My new personal project"
												{...field}
											/>
										</FormControl>
										{/* <FormErrorMessage
											error={
												addMemberFrom.formState.errors
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
	);
}
