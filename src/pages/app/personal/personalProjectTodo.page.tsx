import { State } from "@/common/state.common";
import CreatePersonalProjectTodo from "@/components/app/personal/createPersonalProjectTodo.component";
import { ETodoPriority, ETodoStatus } from "@/definition/enums/todo.emun";
import type { ICreateNewProjectTodoDoIn } from "@/domain/dtos/personal/personal.dto";
import { VCreateNewProjectTodoDoIn } from "@/domain/validations/personal/personal.validation";
import { useCreatePersonalProjectTodo } from "@/hooks/personal/personalProject.hook";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CommonAlert from "@/common/alert.common";
import { useQueryClient } from "@tanstack/react-query";
import { EMutationKey } from "@/definition/enums/mutantionKey.enum";

export default function PersonalProjectTodo() {
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
	const [isOpen, setIsOpen] = useState(false);

	/**
	 * * FORM
	 */
	const createPersonalProjectDefaultValues = {
		project_id: id,
		title: undefined,
		body: undefined,
		priority: undefined,
		status: undefined,
		todo_deadline: undefined,
	};

	const createPersonalProjectTodoForm = useForm<ICreateNewProjectTodoDoIn>({
		resolver: typeboxResolver(VCreateNewProjectTodoDoIn),
		defaultValues: { ...createPersonalProjectDefaultValues },
		mode: "onSubmit",
	});

	/**
	 * * HELPER
	 */
	// const [createPersonalProject, setCreatePersonalProject] =
	// 	useState<ICreateNewProjectTodoDoIn>(
	// 		createPersonalProjectTodoForm.getValues,
	// 	);

	/**
	 * * QUERY
	 */
	const queryClient = useQueryClient();
	const createPersonalProjectTodoMutation = useCreatePersonalProjectTodo();

	/**
	 * * HANDLER
	 */

	function createPersonalProjectTodoHandler(
		createPersonalProjectTodoForm: ICreateNewProjectTodoDoIn,
	) {
		createPersonalProjectTodoMutation.mutate(createPersonalProjectTodoForm, {
			onSuccess: async (res) => {
				if (res) {
					setAlertInfo({
						title: "Create personal project todo successful!",
						desc: `${createPersonalProjectTodoForm.title} Have a nice achievement..`,
						type: "success",
					});

					await queryClient.invalidateQueries({
						queryKey: [EMutationKey.CREATE_PERSONAL_PROJECT_TODO],
					});
					setShowAlert(true);
					setIsOpen(false);

					setTimeout(() => {
						setShowAlert(false);
						// navigate(home);
					}, 3000);
				} else {
					setAlertInfo({
						title: "Create personal project failed!",
						desc: "Please try again.",
						type: "error",
					});
					setShowAlert(true);
				}
			},
			onError: (err) => {
				setAlertInfo({
					title: "Create personal project failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setShowAlert(true);
			},
		});
	}

	// const createPersonalProjectTodoHandler = (
	// 	values: ICreateNewProjectTodoDoIn,
	// ) => {
	// 	setCreatePersonalProject(values);
	// };

	// const isChanged = () => {
	// 	return !createPersonalProjectTodoForm.formState.isDirty;
	// };

	return (
		<State
		// isLoading={personalProjectIsLoading}
		// error={personalProjectError}
		// onRetry={personalProjectRefetch}
		>
			<CommonAlert
				show={showAlert}
				AlertT={alertInfo?.title}
				AlertD={alertInfo?.desc}
				variant={alertInfo?.type === "error" ? "destructive" : "default"}
			/>
			<div>
				<div className="w-full border p-2 flex justify-between items-center">
					<CardHeader className="w-full">
						<CardTitle>Create Personal Todo</CardTitle>
						<CardDescription>
							Here you can create your project and start activities.
						</CardDescription>
					</CardHeader>
					<CardContent className=" flex gap-2 ">
						{/* <Button>Create Personal Project</Button>
					<Button>Create Organize Project</Button> */}
						<CreatePersonalProjectTodo
							createPersonalProjectTodoForm={createPersonalProjectTodoForm}
							createPersonalProjectTodoHandler={
								createPersonalProjectTodoHandler
							}
							setIsOpen={setIsOpen}
							isOpen={isOpen}
						/>
					</CardContent>
				</div>
			</div>
		</State>
	);
}
