import CommonAlert from "@/common/alert.common";
import { State } from "@/common/state.common";
import AllGroupProjectAssignTodoList from "@/components/app/group/allGroupProjectAssignTodoList.component";
import AssignTodoInGroupProjectWithAttachment from "@/components/app/group/assignTodoInGroupProjectWithAttachment.component";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type {
	ICreateAssignTodoInGroupProjectDtoIn,
	IGetAllAssignTodoInGroupProjectListDtoIn,
} from "@/domain/dtos/group/group.dto";
import {
	VCreateAssignTodoInGroupProjectDtoIn,
	VGetAllAssignTodoInGroupProjectListDtoIn,
} from "@/domain/validations/group/group.validation";
import {
	useCreateNewGroupProjectAssignTodoWithAttachment,
	useGetAllAssignTodoInGroupProjectList,
} from "@/hooks/group/group.hook";
import { useAssignTodoInfo } from "@/store/createAssignTodo.store";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectGroupTodo() {
	/**
	 * * NAVIGATION
	 */
	const { id } = useParams();
	const navigate = useNavigate();

	/**
	 * * ZUSTAND
	 */
	const { assignTodoInfo } = useAssignTodoInfo();

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
	const [assignTodoState, setAssignTodoState] = useState(false);

	/**
	 * * FORM
	 */
	const assignTodoForm = useForm<ICreateAssignTodoInGroupProjectDtoIn>({
		resolver: typeboxResolver(VCreateAssignTodoInGroupProjectDtoIn),
		defaultValues: {
			group_id: undefined,
			project_id: undefined,
			assign_to: [],
			title: undefined,
			body: undefined,
			priority: undefined,
			status: undefined,
			deadline: undefined,
		},
		mode: "onSubmit",
	});

	const getAllTodoGroupProjectDefaultValue = {
		group_id: assignTodoInfo?.group_id || "",
		project_id: id || "",
		user_username: undefined,
	};
	const getAllTodoGroupProjectForm =
		useForm<IGetAllAssignTodoInGroupProjectListDtoIn>({
			resolver: typeboxResolver(VGetAllAssignTodoInGroupProjectListDtoIn),
			defaultValues: getAllTodoGroupProjectDefaultValue,
			mode: "onSubmit",
		});

	/**
	 * * HELPER
	 */
	const [getAllTodoGroupProjectState, setGetAllTodoGroupProjectState] =
		useState<IGetAllAssignTodoInGroupProjectListDtoIn>(
			getAllTodoGroupProjectForm.getValues(),
		);

	/**
	 * * QUERIES
	 */
	const assignTodoMutation = useCreateNewGroupProjectAssignTodoWithAttachment();

	const {
		data: allAssignTodoData,
		error: allAssignTodoError,
		isLoading: allAssignTodoIsLoading,
		refetch: allAssignTodoRefetch,
	} = useGetAllAssignTodoInGroupProjectList(getAllTodoGroupProjectState);

	/**
	 * * HANDLERS
	 */
	function assignTodoHandler(formData: ICreateAssignTodoInGroupProjectDtoIn) {
		assignTodoMutation.mutate(formData, {
			onSuccess: () => {
				setAlertInfo({
					title: "Create personal project todo successful!",
					desc: `${formData.title} Have a nice achievement..`,
					type: "success",
				});
				setShowAlert(true);
				setAssignTodoState(false);
				allAssignTodoRefetch();

				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
			},
			onError: (err) => {
				setAlertInfo({
					title: "Create personal project failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setShowAlert(true);
				setAssignTodoState(false);
			},
		});
	}

	const getAllTodoGroupProjectHandler = (
		values: IGetAllAssignTodoInGroupProjectListDtoIn,
	) => {
		setGetAllTodoGroupProjectState(values);
	};

	const clearFilter = () => {
		const clearedValues = {
			group_id: assignTodoInfo?.group_id || "",
			project_id: id || "",
			user_username: undefined,
		};

		getAllTodoGroupProjectForm.reset(clearedValues);

		setGetAllTodoGroupProjectState(clearedValues);
	};

	const isChanged = () => {
		return !getAllTodoGroupProjectForm.formState.isDirty;
	};
	/**
	 * * EFFECTS
	 */

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!assignTodoInfo) return;

		assignTodoForm.reset({
			group_id: assignTodoInfo.group_id,
			project_id: id,
			assign_to: undefined,
			title: undefined,
			body: undefined,
			priority: undefined,
			status: undefined,
			deadline: undefined,
		});
	}, [assignTodoInfo, id]);

	return (
		<State
			isLoading={allAssignTodoIsLoading}
			error={allAssignTodoError}
			onRetry={allAssignTodoRefetch}
		>
			<div>
				<CommonAlert
					show={showAlert}
					AlertT={alertInfo?.title}
					AlertD={alertInfo?.desc}
					variant={alertInfo?.type === "error" ? "destructive" : "default"}
				/>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3">
						<div className="border h-15">
							<Button
								variant="ghost"
								className="h-full flex items-center justify-center"
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
							<CardContent className="flex gap-2">
								<AssignTodoInGroupProjectWithAttachment
									assignTodoHandler={assignTodoHandler}
									assignTodoForm={assignTodoForm}
									setAssignTodoState={setAssignTodoState}
									assignTodoState={assignTodoState}
								/>
							</CardContent>
						</div>
					</div>

					<div className="w-full border p-2 flex flex-col justify-between items-center">
						<CardHeader className="w-full flex flex-col gap-3 pt-2">
							<div>
								<CardTitle>All Group Todos</CardTitle>
								<CardDescription>
									<p>
										Here you can see your all Assign group todo, You can search
										by your username to see if have assign todo
									</p>
								</CardDescription>
							</div>
							<div className="border w-full">
								<FormProvider {...getAllTodoGroupProjectForm}>
									<form
										onSubmit={getAllTodoGroupProjectForm.handleSubmit(
											getAllTodoGroupProjectHandler,
										)}
										className="flex p-2 items-center justify-between"
									>
										<FieldGroup>
											<FormField
												control={getAllTodoGroupProjectForm.control}
												name="user_username"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																className=" placeholder:text-xs w-70 text-sm p-1 h-9"
																placeholder="Search By username"
																{...field}
															/>
														</FormControl>
													</FormItem>
												)}
											/>
										</FieldGroup>
										<div className="flex  items-center justify-center gap-2">
											<Button
												className={"w-18"}
												type="submit"
												disabled={isChanged() === true}
											>
												Search
											</Button>
											<Button
												className={"w-18"}
												type="button"
												variant="outline"
												onClick={clearFilter}
											>
												Clear
											</Button>
										</div>
									</form>
								</FormProvider>
							</div>
						</CardHeader>
						<CardContent className="w-full flex gap-2">
							<AllGroupProjectAssignTodoList
								allAssignTodoData={allAssignTodoData}
								buildTodoPath={(assignTodoId) =>
									`/dashboard/group/group-details/project-group-todos/${id}/todo/${assignTodoId}`
								}
							/>
						</CardContent>
					</div>
				</div>
			</div>
		</State>
	);
}
