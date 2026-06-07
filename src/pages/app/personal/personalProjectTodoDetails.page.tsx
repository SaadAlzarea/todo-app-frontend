import CommonAlert from "@/common/alert.common";
import { State } from "@/common/state.common";
import PersonalProjectTodoAction from "@/components/app/personal/personalProjectTodoAction.components";
import PersonalProjectForOneTodoDetails from "@/components/app/personal/personalProjectTodoDetails.components";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EMutationKey } from "@/definition/enums/mutantionKey.enum";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type {
	IDeletePersonalProjectTodoByIdDtoIn,
	IGetPersonalProjectTodoDetailsDtoIn,
	IMakePersonalProjectTodoIsCompletedDtoIn,
	IUpdatePersonalProjectTodoDtoIn,
} from "@/domain/dtos/personal/personal.dto";
import { todoAppPath } from "@/domain/paths/appPath/todo.appPath";
import {
	VDeletePersonalProjectTodoByIdDtoIn,
	VMakePersonalProjectTodoIsCompletedDtoIn,
	VPersonalProjectTodoGetTodoDetailsDtoIn,
	VUpdatePersonalProjectTodoDtoIn,
} from "@/domain/validations/personal/personal.validation";
import {
	useDeletePersonalProjectTodo,
	useGetPersonalProjectTodoDetails,
	useMakePersonalProjectTodoIsCompleted,
	useUpdatePersonalProjectTodo,
} from "@/hooks/personal/personalProject.hook";
import { usePersonalProjectTodoStore } from "@/store/personalProjectTodoAction.store";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function PersonalProjectTodoDetails() {
	/**
	 * * NAVIGATION
	 */
	const { id } = useParams();
	const navigate = useNavigate();

	/**
	 * * PATHS
	 */
	const { personalProjectTodos } = todoAppPath;

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
	const [deleteTodoState, setDeleteTodoState] = useState(false);
	const [isCompletedTodoState, setIsCompletedTodoState] = useState(false);
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

	// delete todo
	const deletePersonalProjectTodoDefaultValues = {
		todo_id: id,
	};
	const deletePersonalProjectTodoForm =
		useForm<IDeletePersonalProjectTodoByIdDtoIn>({
			resolver: typeboxResolver(VDeletePersonalProjectTodoByIdDtoIn),
			defaultValues: { ...deletePersonalProjectTodoDefaultValues },
			mode: "onSubmit",
		});

	// make is completed
	const makePersonalProjectTodoIsCompletedDefaultValues = {
		todo_id: id,
	};
	const makePersonalProjectTodoIsCompletedForm =
		useForm<IMakePersonalProjectTodoIsCompletedDtoIn>({
			resolver: typeboxResolver(VMakePersonalProjectTodoIsCompletedDtoIn),
			defaultValues: { ...makePersonalProjectTodoIsCompletedDefaultValues },
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

	const deletePersonalProjectTodoMutation = useDeletePersonalProjectTodo();

	const makePersonalProjectTodoIsCompletedMutation =
		useMakePersonalProjectTodoIsCompleted();

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

	function deletePersonalProjectTodoHandler(
		deletePersonalProjectTodoForm: IDeletePersonalProjectTodoByIdDtoIn,
	) {
		deletePersonalProjectTodoMutation.mutate(deletePersonalProjectTodoForm, {
			onSuccess: async () => {
				setAlertInfo({
					title: "Delete personal project todo successful!",
					desc: `${deletePersonalProjectTodoForm.todo_id} Has been deleted.`,
					type: "success",
				});

				navigate(-1);

				setShowAlert(true);
				setDeleteTodoState(false);

				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			},
			onError: (err) => {
				console.log("DELETE ERROR", err);

				setAlertInfo({
					title: "delete personal project todo failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
			},
		});
	}

	function makePersonalProjectTodoIsCompletedHandler(
		makePersonalProjectTodoIsCompletedForm: IDeletePersonalProjectTodoByIdDtoIn,
	) {
		makePersonalProjectTodoIsCompletedMutation.mutate(
			makePersonalProjectTodoIsCompletedForm,
			{
				onSuccess: async () => {
					setAlertInfo({
						title: "Make personal project todo completed successful!",
						desc: `${makePersonalProjectTodoIsCompletedForm.todo_id} Has been deleted.`,
						type: "success",
					});

					navigate(-1);

					setShowAlert(true);
					setDeleteTodoState(false);

					setTimeout(() => {
						setShowAlert(false);
					}, 3000);
				},
				onError: (err) => {
					setAlertInfo({
						title: "Make personal project todo completed failed",
						desc: `${err}` || "Something went wrong.",
						type: "error",
					});
				},
			},
		);
	}
	/**
	 * * ZUSTAND
	 */

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
			<div className="flex flex-col gap-3">
				<div className="flex items-center gap-3">
					<div className="border h-15 ">
						<Button
							variant={"ghost"}
							className={"h-full flex items-center justify-center"}
							onClick={() => navigate(-1)}
						>
							<ArrowLeft />
						</Button>
					</div>
					<div className="w-full border p-2 flex items-center justify-between">
						<CardHeader className="w-full">
							<CardTitle>Make Action For todo</CardTitle>
							<CardDescription>
								Here you can update, delete, and done your todo details.
							</CardDescription>
						</CardHeader>
						<CardContent className=" gap-2 flex items-center just w-full h-full">
							<PersonalProjectTodoAction
								updatePersonalProjectTodoForm={updatePersonalProjectTodoForm}
								updatePersonalProjectTodoHandler={
									updatePersonalProjectTodoHandler
								}
								updateTodoState={updateTodoState}
								setUpdateTodoState={setUpdateTodoState}
								deletePersonalProjectTodoHandler={
									deletePersonalProjectTodoHandler
								}
								deleteTodoState={deleteTodoState}
								setDeleteTodoState={setDeleteTodoState}
								deletePersonalProjectTodoForm={deletePersonalProjectTodoForm}
								makePersonalProjectTodoIsCompletedHandler={
									makePersonalProjectTodoIsCompletedHandler
								}
								isCompletedTodoState={isCompletedTodoState}
								setIsCompletedTodoState={setIsCompletedTodoState}
								makePersonalProjectTodoIsCompletedForm={
									makePersonalProjectTodoIsCompletedForm
								}
							/>
						</CardContent>
					</div>
				</div>
				<div className="w-full border p-2 flex flex-col justify-between items-center ">
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
			</div>
		</State>
	);
}
