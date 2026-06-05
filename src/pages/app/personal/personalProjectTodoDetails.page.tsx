import CommonAlert from "@/common/alert.common";
import { State } from "@/common/state.common";
import PersonalProjectTodoAction from "@/components/app/personal/personalProjectTodoAction.components";
import PersonalProjectForOneTodoDetails from "@/components/app/personal/personalProjectTodoDetails.components";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type {
	IGetPersonalProjectTodoDetailsDtoIn,
	IUpdatePersonalProjectTodoDtoIn,
} from "@/domain/dtos/personal/personal.dto";
import {
	VPersonalProjectTodoGetTodoDetailsDtoIn,
	VUpdatePersonalProjectTodoDtoIn,
} from "@/domain/validations/personal/personal.validation";
import {
	useGetPersonalProjectTodoDetails,
	useUpdatePersonalProjectTodo,
} from "@/hooks/personal/personalProject.hook";
import { usePersonalProjectTodoStore } from "@/store/personalProjectTodoAction.store";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function PersonalProjectTodoDetails() {
	/**
	 * * NAVIGATION
	 */
	const { id } = useParams();

	/**
	 * * GLOBALS
	 */
	const [alertInfo, setAlertInfo] = useState<{
		title: string;
		desc: string;
		type: "success" | "error";
	} | null>(null);
	const [showAlert, setShowAlert] = useState(false);
	const [updateTodoState, setUpdateTodoState] = useState(false);
	/**
	 * * FORM
	 */

	// get details
	const personalProjectTodoDetailsDefaultValues = {
		todo_id: id,
	};
	const PersonalProjectTodoDetailsForm =
		useForm<IGetPersonalProjectTodoDetailsDtoIn>({
			resolver: typeboxResolver(VPersonalProjectTodoGetTodoDetailsDtoIn),
			defaultValues: { ...personalProjectTodoDetailsDefaultValues },
			mode: "onSubmit",
		});

	// update todo
	const createPersonalProjectDefaultValues = {
		todo_id: id,
		title: undefined,
		body: undefined,
		priority: undefined,
		status: undefined,
	};
	const updatePersonalProjectTodoForm =
		useForm<IUpdatePersonalProjectTodoDtoIn>({
			resolver: typeboxResolver(VUpdatePersonalProjectTodoDtoIn),
			defaultValues: { ...createPersonalProjectDefaultValues },
			mode: "onSubmit",
		});

	/**
	 * * HANDLERS
	 */
	const [personalProjectTodoDetailsForm, setPersonalProjectTodoDetailsForm] =
		useState<IGetPersonalProjectTodoDetailsDtoIn>(
			PersonalProjectTodoDetailsForm.getValues(),
		);

	/**
	 * * QUERIES
	 */
	const {
		data: personalProjectTodoDetailsData,
		isLoading: personalProjectTodoDetailsIsLoading,
		error: personalProjectTodoDetailsError,
		refetch: personalProjectTodoDetailsRefetch,
	} = useGetPersonalProjectTodoDetails(personalProjectTodoDetailsForm);

	const queryClient = useQueryClient();
	const updatePersonalProjectTodoMutation = useUpdatePersonalProjectTodo();
	/**
	 * * HANDLERS
	 */

	function updatePersonalProjectTodoHandler(
		updatePersonalProjectTodoForm: IUpdatePersonalProjectTodoDtoIn,
	) {
		updatePersonalProjectTodoMutation.mutate(updatePersonalProjectTodoForm, {
			onSuccess: async (res) => {
				if (res) {
					setAlertInfo({
						title: "Update personal project todo successful!",
						desc: `${updatePersonalProjectTodoForm.title} Have a nice achievement..`,
						type: "success",
					});

					await queryClient.invalidateQueries({
						queryKey: [EMutationKey.UPDATE_PERSONAL_PROJECT_TODO],
					});
					await queryClient.invalidateQueries({
						queryKey: [EQueryKey.GET_PERSONAL_PROJECT_TODO_DETAILS],
					});

					setShowAlert(true);
					setUpdateTodoState(false);

					setTimeout(() => {
						setShowAlert(false);
					}, 3000);
				} else {
					setAlertInfo({
						title: "Update personal project failed!",
						desc: "Please try again.",
						type: "error",
					});
					setShowAlert(true);
				}
			},
			onError: (err) => {
				setAlertInfo({
					title: "Update personal project failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setShowAlert(true);
			},
		});
	}

	/**
	 * * ZUSTAND
	 */

	// const {
	// 	setUpdatePersonalProjectTodoHandler,
	// 	setUpdatePersonalProjectTodoForm,
	// } = usePersonalProjectTodoStore();

	// useEffect(() => {
	// 	setUpdatePersonalProjectTodoHandler(updatePersonalProjectTodoHandler);

	// 	setUpdatePersonalProjectTodoForm(updatePersonalProjectTodoForm);
	// }, []);

	/**
	 * * EFFECTS
	 */
	// useEffect(() => {
	//     if (id) {
	//         PersonalProjectTodoDetailsForm.setValue("todo_id", id);
	//         setPersonalProjectTodoDetailsForm((prev) => ({
	//             ...prev,
	//             todo_id: id,
	//         }));
	//     }
	// }

	return (
		<State
			isLoading={personalProjectTodoDetailsIsLoading}
			error={personalProjectTodoDetailsError}
			onRetry={personalProjectTodoDetailsRefetch}
		>
			<CommonAlert
				show={showAlert}
				AlertT={alertInfo?.title}
				AlertD={alertInfo?.desc}
				variant={alertInfo?.type === "error" ? "destructive" : "default"}
			/>
			<div className="flex gap-3">
				<div className="w-5/6 border p-2 flex flex-col justify-between items-center ">
					<CardHeader className="w-full">
						<CardTitle>Personal Todo Details</CardTitle>
						<CardDescription>
							Here you can view your todo details.
						</CardDescription>
					</CardHeader>
					<CardContent className=" flex gap-2 w-full">
						<PersonalProjectForOneTodoDetails
							personalProjectTodoDetailsData={personalProjectTodoDetailsData}
						/>
					</CardContent>
				</div>
				<div className="w-1/6 border p-2 flex flex-col justify-between items-center">
					<CardHeader className="w-full">
						<CardTitle>Make Action For todo</CardTitle>
						<CardDescription>
							Here you can update, delete, and done your todo details.
						</CardDescription>
					</CardHeader>
					<CardContent className=" flex gap-2 w-full h-full">
						<PersonalProjectTodoAction
							updatePersonalProjectTodoForm={updatePersonalProjectTodoForm}
							updatePersonalProjectTodoHandler={
								updatePersonalProjectTodoHandler
							}
							updateTodoState={updateTodoState}
							setUpdateTodoState={setUpdateTodoState}
						/>
					</CardContent>
				</div>
			</div>
		</State>
	);
}
