import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { State } from "@/common/state.common";
import React, { useState } from "react";
import CommonAlert from "@/common/alert.common";
import { useForm } from "react-hook-form";
import type {
	ICreateGroupDtoIn,
	IDeleteGroupDtoIn,
} from "@/domain/dtos/group/group.dto";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import {
	VCreateGroupDtoIn,
	VDeleteGroupDtoIn,
} from "@/domain/validations/group/group.validation";
import { create } from "axios";
import {
	useCreateGroup,
	useDeleteGroup,
	useGetAllUserGroupsByUserId,
} from "@/hooks/group/group.hook";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import CreateNewGroup from "@/components/app/group/createNewGroup.component";
import AllGroupList from "@/components/app/group/allGroupList.component";
import { useQueryClient } from "@tanstack/react-query";

export default function Groups() {
	/**
	 * * ALERTS
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
	const [createNewGroup, setCreateNewGroup] = useState(false);
	const [deleteGroup, setDeleteGroup] = useState(false);
	/**
	 * * FORM
	 */
	// create group
	const createGroupDefaultBody = {
		group_name: undefined,
	};
	const createGroupForm = useForm<ICreateGroupDtoIn>({
		resolver: typeboxResolver(VCreateGroupDtoIn),
		defaultValues: {
			...createGroupDefaultBody,
		},
		mode: "onSubmit",
	});

	// delete group
	const deleteGroupDefaultBody = {
		group_id: undefined,
	};

	const deleteGroupForm = useForm<IDeleteGroupDtoIn>({
		resolver: typeboxResolver(VDeleteGroupDtoIn),
		defaultValues: deleteGroupDefaultBody,
		mode: "onSubmit",
	});

	/**
	 * * QUERIES
	 */
	const queryClient = useQueryClient();

	const createGroupMutation = useCreateGroup();

	const deleteGroupMutation = useDeleteGroup();

	const {
		data: getAllUserGroupsData,
		isLoading: getAllUserGroupsIsLoading,
		error: getAllUserGroupsError,
		refetch: getAllUserGroupsRefetch,
	} = useGetAllUserGroupsByUserId();

	/**
	 * * HANDLERS
	 */
	function createGroupHandler(createGroupForm: ICreateGroupDtoIn) {
		createGroupMutation.mutate(createGroupForm, {
			onSuccess: () => {
				setAlertInfo({
					title: "Create group successful!",
					desc: `${createGroupForm.group_name} Have a nice achievement..`,
					type: "success",
				});
				getAllUserGroupsRefetch();
				setShowAlert(true);
				setCreateNewGroup(false);
				setTimeout(() => {
					setShowAlert(false);
					// navigate(home);
				}, 3000);
			},
			onError: (err) => {
				setAlertInfo({
					title: "Create group failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setCreateNewGroup(false);
				setShowAlert(true);
			},
		});
	}

	function deleteGroupHandler(deleteGroupForm: IDeleteGroupDtoIn) {
		deleteGroupMutation.mutate(deleteGroupForm, {
			onSuccess: () => {
				setAlertInfo({
					title: "Delete group successful!",
					desc: `${deleteGroupForm.group_id} Have a nice achievement..`,
					type: "success",
				});
				getAllUserGroupsRefetch();
				setDeleteGroup(false);
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
					// navigate(home);
				}, 3000);
			},
			onError(err) {
				setAlertInfo({
					title: "Delete group failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setDeleteGroup(false);
				setShowAlert(true);
			},
		});
	}
	/**
	 * * EFFECTS
	 */

	return (
		<State
			isLoading={getAllUserGroupsIsLoading}
			onRetry={getAllUserGroupsRefetch}
			error={getAllUserGroupsError}
		>
			<div>
				<CommonAlert
					show={showAlert}
					AlertT={alertInfo?.title}
					AlertD={alertInfo?.desc}
					variant={alertInfo?.type === "error" ? "destructive" : "default"}
				/>
				<div className=" flex flex-col gap-2">
					<div className="w-full border p-2 flex justify-between items-center">
						<CardHeader className="w-full">
							<CardTitle>Create Group</CardTitle>
							<CardDescription>
								Here you can create group with your team and start activities.
							</CardDescription>
						</CardHeader>
						<CardContent className=" flex gap-2 ">
							<CreateNewGroup
								createGroupHandler={createGroupHandler}
								createGroupForm={createGroupForm}
								createNewGroup={createNewGroup}
								setCreateNewGroup={setCreateNewGroup}
							/>
						</CardContent>
					</div>
					<div className="w-full border p-2 flex flex-col justify-between items-center">
						<CardHeader className="w-full">
							<CardTitle>All Groups</CardTitle>
							<CardDescription>
								Here you can see your all your groups.
							</CardDescription>
						</CardHeader>
						<CardContent className="w-full flex gap-2 ">
							<AllGroupList
								getAllUserGroupsData={getAllUserGroupsData}
								deleteGroupHandler={deleteGroupHandler}
								deleteGroup={deleteGroup}
								setDeleteGroup={setDeleteGroup}
								deleteGroupForm={deleteGroupForm}
							/>
						</CardContent>
					</div>
				</div>
			</div>
		</State>
	);
}
