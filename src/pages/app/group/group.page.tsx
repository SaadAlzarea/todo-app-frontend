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
import type { ICreateGroupDtoIn } from "@/domain/dtos/group/group.dto";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { VCreateGroupDtoIn } from "@/domain/validations/group/group.validation";
import { create } from "axios";
import {
	useCreateGroup,
	useGetAllUserGroupsByUserId,
} from "@/hooks/group/group.hook";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import CreateNewGroup from "@/components/app/group/createNewGroup.component";
import AllGroupList from "@/components/app/group/allGroupList.component";

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

	// all groups
	// const getAllUserGroupsDefaultBody ={
	// }
	/**
	 * * QUERIES
	 */
	const createGroupMutation = useCreateGroup();

	const {
		data: getAllUserGroupsData,
		isLoading: getAllUserGroupsIsLoading,
		error: getAllUserGroupsError,
		refetch: getAllUserGroupsRefetch,
	} = useGetAllUserGroupsByUserId();

	console.log(getAllUserGroupsData);

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
	/**
	 * * EFFECTS
	 */
	return (
		<State>
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
							<AllGroupList getAllUserGroupsData={getAllUserGroupsData} />
						</CardContent>
					</div>
				</div>
			</div>
		</State>
	);
}
