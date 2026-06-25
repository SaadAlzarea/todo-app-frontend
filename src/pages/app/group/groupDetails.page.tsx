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
	ICreateGroupProjectDtoIn,
	IDeleteMemberFromGroupDtoIn,
	IGetAllGroupMemberByIdDtoIn,
	IGetAllGroupMemberByIdDtoOut,
	IGetAllGroupProjectsDtoIn,
} from "@/domain/dtos/group/group.dto";
import {
	VAddMemberToGroupDtoIn,
	VCreateGroupProjectDtoIn,
	VDeleteMemberFromGroupDtoIn,
	VGetAllGroupMemberByIdDtoIn,
	VGetAllGroupProjectsDtoIn,
} from "@/domain/validations/group/group.validation";
import {
	useAddNewMemberToGroupByUserEmail,
	useCreateGroupProject,
	useDeleteMemberFromGroup,
	useGetAllGroupMemberByGroupId,
	useGetAllGroupProjects,
} from "@/hooks/group/group.hook";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import GroupMembers from "@/components/app/group/groupMembere.component";
import AddMemberToGroup from "@/components/app/group/addMemberToGroup.component";
import CommonAlert from "@/common/alert.common";
import CreateGroupProject from "@/components/app/group/createGroupProject.component";
import AllGroupProjects from "@/components/app/group/allGroupProjects.component";
import { useAssignTodoInfo } from "@/store/createAssignTodo.store";
import { useGroupMemberStore } from "@/store/groupMember.store";

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
	const [createGroupProject, setCreateGroupProject] = useState(false);

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

	// get all group project
	const allGroupProjectsDefaultValue = {
		group_id: id,
	};
	const allGroupProjectsForm = useForm<IGetAllGroupProjectsDtoIn>({
		resolver: typeboxResolver(VGetAllGroupProjectsDtoIn),
		defaultValues: allGroupProjectsDefaultValue,
		mode: "onSubmit",
	});

	// create group project
	const createGroupProjectDefaultValue = {
		project_name: undefined,
		group_id: id,
		project_deadline: undefined,
	};
	const createGroupProjectForm = useForm<ICreateGroupProjectDtoIn>({
		resolver: typeboxResolver(VCreateGroupProjectDtoIn),
		defaultValues: createGroupProjectDefaultValue,
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

	// get all group projects
	const {
		data: allGroupProjectsData,
		error: allGroupProjectsError,
		isLoading: allGroupProjectsIsLoading,
		refetch: allGroupProjectsRefetch,
	} = useGetAllGroupProjects(allGroupProjectsForm.getValues());

	// add member
	const addMemberToGroupMutation = useAddNewMemberToGroupByUserEmail();

	// delete member
	const deleteMemberFromGroupMutation = useDeleteMemberFromGroup();

	//create group project
	const createGroupProjectMutation = useCreateGroupProject();

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

	function createGroupProjectHandler(
		createGroupProjectForm: ICreateGroupProjectDtoIn,
	) {
		createGroupProjectMutation.mutate(createGroupProjectForm, {
			onSuccess: () => {
				setAlertInfo({
					title: "Add New member to group successful!",
					desc: `${createGroupProjectForm.project_deadline} Has been deleted.`,
					type: "success",
				});

				setShowAlert(true);
				setCreateGroupProject(false);
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
				setCreateGroupProject(false);
			},
		});
	}

	/**
	 * * ZUSTAND
	 */
	const { setAssignTodoInfo } = useAssignTodoInfo();
	const { setGroupMember } = useGroupMemberStore();

	/**
	 * * EFFECT
	 */
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		groupMembersRefetch();
	}, [addedMemberToGroupHandler, deleteMemberFromGroupHandler]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		allGroupProjectsRefetch();
	}, [createGroupProjectHandler]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!id) return;

		setAssignTodoInfo({ group_id: id });
	}, [id]);

	useEffect(() => {
		if (!groupMembersData) return;

		setGroupMember(
			groupMembersData.map((member) => ({
				email: member.email,
				username: member.username,
				user_id: member.user_id,
			})),
		);
	}, [groupMembersData, setGroupMember]);

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
								<CreateGroupProject
									createGroupProjectHandler={createGroupProjectHandler}
									createGroupProjectForm={createGroupProjectForm}
									setCreateGroupProject={setCreateGroupProject}
									createGroupProject={createGroupProject}
								/>
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
						<State
							error={allGroupProjectsError}
							isLoading={allGroupProjectsIsLoading}
							onRetry={allGroupProjectsRefetch}
						>
							<div className="w-full border p-2 flex flex-col justify-between items-center">
								<CardHeader className="w-full">
									<CardTitle>All Project</CardTitle>
									<CardDescription>
										Here you can see your all your groups.
									</CardDescription>
								</CardHeader>
								<CardContent className="w-full flex gap-2 ">
									<AllGroupProjects
										allGroupProjectsData={allGroupProjectsData}
									/>
								</CardContent>
							</div>
						</State>
					)}
				</div>
			</div>
		</State>
	);
}
