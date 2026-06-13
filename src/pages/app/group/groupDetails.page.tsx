import { State } from "@/common/state.common";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type {
	IAddMemberToGroupDtoIn,
	IDeleteMemberFromGroupDtoIn,
	IGetAllGroupMemberByIdDtoIn,
	IGetAllGroupMemberByIdDtoOut,
} from "@/domain/dtos/group/group.dto";
import {
	VAddMemberToGroupDtoIn,
	VDeleteMemberFromGroupDtoIn,
	VGetAllGroupMemberByIdDtoIn,
} from "@/domain/validations/group/group.validation";
import {
	useAddNewMemberToGroupByUserEmail,
	useDeleteMemberFromGroup,
	useGetAllGroupMemberByGroupId,
} from "@/hooks/group/group.hook";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import GroupMembers from "@/components/app/group/groupMembere.component";
import AddMemberToGroup from "@/components/app/group/addMemberToGroup.component";
import CommonAlert from "@/common/alert.common";

export default function GroupDetails() {
	/**
	 * * NAVIGATION
	 */
	const { id } = useParams();
	const navigate = useNavigate();

	/**
	 * * ALERT
	 */
	const [alertInfo, setAlertInfo] = useState<{
		title: string;
		desc: string;
		type: "success" | "error";
	} | null>(null);
	const [showAlert, setShowAlert] = useState(false);

	/**
	 * * GLOBAL
	 */
	const [openMember, setOpenMember] = useState(false);
	const [addMember, setAddMember] = useState(false);
	const [deleteMember, setDeleteMember] = useState(false);

	/**
	 * * FORMS
	 */
	// group members details
	const groupMembersDefaultValue = {
		group_id: id,
	};
	const groupMembersForm = useForm<IGetAllGroupMemberByIdDtoIn>({
		resolver: typeboxResolver(VGetAllGroupMemberByIdDtoIn),
		defaultValues: groupMembersDefaultValue,
		mode: "onSubmit",
	});

	// add member
	const addMemberDefaultValue = {
		member_email: undefined,
		group_id: id,
	};
	const addMemberFrom = useForm<IAddMemberToGroupDtoIn>({
		resolver: typeboxResolver(VAddMemberToGroupDtoIn),
		defaultValues: addMemberDefaultValue,
		mode: "onSubmit",
	});

	// delete member
	const deleteMemberDefaultValue = {
		member_user_id: undefined,
		group_id: id,
	};
	const deleteMemberForm = useForm<IDeleteMemberFromGroupDtoIn>({
		resolver: typeboxResolver(VDeleteMemberFromGroupDtoIn),
		defaultValues: deleteMemberDefaultValue,
		mode: "onSubmit",
	});
	/**
	 * * QUERIES
	 */
	// group members details
	const {
		data: groupMembersData,
		isLoading: groupMembersIsLoading,
		error: groupMembersError,
		refetch: groupMembersRefetch,
	} = useGetAllGroupMemberByGroupId(groupMembersForm.getValues());

	// add member
	const addMemberToGroupMutation = useAddNewMemberToGroupByUserEmail();

	// delete member
	const deleteMemberFromGroupMutation = useDeleteMemberFromGroup();

	/**
	 * * HANDLERS
	 */
	function addedMemberToGroupHandler(addMemberFrom: IAddMemberToGroupDtoIn) {
		addMemberToGroupMutation.mutate(addMemberFrom, {
			onSuccess: () => {
				setAlertInfo({
					title: "Add New member to group successful!",
					desc: `${addMemberFrom.member_email} Has been deleted.`,
					type: "success",
				});

				setShowAlert(true);
				setAddMember(false);

				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			},
			onError: (err) => {
				setAlertInfo({
					title: "delete personal project todo failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setAddMember(false);
			},
		});
	}

	function deleteMemberFromGroupHandler(
		deleteMemberForm: IDeleteMemberFromGroupDtoIn,
	) {
		deleteMemberFromGroupMutation.mutate(deleteMemberForm, {
			onSuccess: () => {
				setAlertInfo({
					title: "Add New member to group successful!",
					desc: `${deleteMemberForm.member_user_id} Has been deleted.`,
					type: "success",
				});
				setDeleteMember(false);
				setShowAlert(true);

				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			},
			onError: (err) => {
				setAlertInfo({
					title: "delete personal project todo failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setDeleteMember(false);
			},
		});
	}

	/**
	 * * EFFECT
	 */
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		groupMembersRefetch();
	}, [addedMemberToGroupHandler, deleteMemberFromGroupHandler]);

	return (
		<State>
			<div>
				<CommonAlert
					show={showAlert}
					AlertT={alertInfo?.title}
					AlertD={alertInfo?.desc}
					variant={alertInfo?.type === "error" ? "destructive" : "default"}
				/>
				<div className=" flex flex-col gap-3">
					<div className="flex items-center gap-3">
						<div className="border h-15  ">
							<Button
								variant={"ghost"}
								className={"h-full flex items-center justify-center"}
								onClick={() => navigate(-1)}
							>
								<ArrowLeft />
							</Button>
						</div>
						<div className="w-full border p-2 flex justify-between items-center">
							<CardHeader className="w-full">
								<CardTitle>Actions in your group</CardTitle>
								<CardDescription>
									Here you can create new project with your team and start and
									add new member activities.
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
										<AddMemberToGroup
											addMemberFrom={addMemberFrom}
											addedMemberToGroupHandler={addedMemberToGroupHandler}
											setAddMember={setAddMember}
											addMember={addMember}
										/>
									</div>
								</CardHeader>
								<CardContent className="w-full flex gap-2 ">
									<GroupMembers
										groupMembersData={
											groupMembersData as unknown as IGetAllGroupMemberByIdDtoOut
										}
										//delete member props
										deleteMemberFromGroupHandler={deleteMemberFromGroupHandler}
										deleteMemberForm={deleteMemberForm}
										deleteMember={deleteMember}
										setDeleteMember={setDeleteMember}
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
