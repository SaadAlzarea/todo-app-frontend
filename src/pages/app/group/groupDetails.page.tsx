import { State } from "@/common/state.common";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type {
	IGetAllGroupMemberByIdDtoIn,
	IGetAllGroupMemberByIdDtoOut,
} from "@/domain/dtos/group/group.dto";
import { VGetAllGroupMemberByIdDtoIn } from "@/domain/validations/group/group.validation";
import { useGetAllGroupMemberByGroupId } from "@/hooks/group/group.hook";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import GroupMembers from "@/components/app/group/groupMembere.component";

export default function GroupDetails() {
	/**
	 * * NAVIGATION
	 */
	const { id } = useParams();
	const navigate = useNavigate();

	/**
	 * * ALERT
	 */
	/**
	 * * GLOBAL
	 */
	const [openMember, setOpenMember] = useState(false);
	/**
	 * * FORM
	 */
	const groupMembersDefaultValue = {
		group_id: id,
	};
	const groupMembersForm = useForm<IGetAllGroupMemberByIdDtoIn>({
		resolver: typeboxResolver(VGetAllGroupMemberByIdDtoIn),
		defaultValues: groupMembersDefaultValue,
		mode: "onSubmit",
	});
	/**
	 * * QUERIES
	 */
	const {
		data: groupMembersData,
		isLoading: groupMembersIsLoading,
		error: groupMembersError,
		refetch: groupMembersRefetch,
	} = useGetAllGroupMemberByGroupId(groupMembersForm.getValues());

	console.log("this is group members in group page ", groupMembersData);

	/**
	 * * HANDLERS
	 */
	/**
	 * * EFFECT
	 */

	return (
		<State>
			<div>
				{/* <CommonAlert
					show={showAlert}
					AlertT={alertInfo?.title}
					AlertD={alertInfo?.desc}
					variant={alertInfo?.type === "error" ? "destructive" : "default"}
				/> */}
				<div className=" flex flex-col gap-3">
					<div className="w-full border p-2 flex justify-between items-center">
						<CardHeader className="w-full">
							<CardTitle>Actions in your group</CardTitle>
							<CardDescription>
								Here you can create new project with your team and start and add
								new member activities.
							</CardDescription>
						</CardHeader>
						<CardContent className=" flex gap-2 ">
							<Link to={``}>
								<Button
									onClick={() => {
										setOpenMember(true);
									}}
								>
									Members
								</Button>
							</Link>
							<Button>Create Project</Button>
						</CardContent>
					</div>

					{openMember ? (
						<State
							isLoading={groupMembersIsLoading}
							error={groupMembersError}
							onRetry={groupMembersRefetch}
						>
							<div className="w-full border p-2 flex flex-col gap-3 ">
								<CardHeader className="w-full flex gap-3 items-center ">
									<div className="w-full flex gap-3 items-center ">
										<div className="border">
											<Button
												variant={"ghost"}
												className={"  flex items-center justify-center"}
												onClick={() => {
													setOpenMember(false);
												}}
											>
												<ArrowLeft />
											</Button>
										</div>
										<div>
											<CardTitle>All Member</CardTitle>
											<CardDescription>
												Here you can see your all your groups.
											</CardDescription>
										</div>
									</div>
									<div>
										<Button>Add Member</Button>
									</div>
								</CardHeader>
								<CardContent className="w-full flex gap-2 ">
									<GroupMembers
										groupMembersData={
											groupMembersData as unknown as IGetAllGroupMemberByIdDtoOut
										}
									/>
								</CardContent>
							</div>
						</State>
					) : (
						<div className="w-full border p-2 flex flex-col justify-between items-center">
							<CardHeader className="w-full">
								<CardTitle>All Project</CardTitle>
								<CardDescription>
									Here you can see your all your groups.
								</CardDescription>
							</CardHeader>
							<CardContent className="w-full flex gap-2 "></CardContent>
						</div>
					)}
				</div>
			</div>
		</State>
	);
}
