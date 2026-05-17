import CommonAlert from "@/common/alert.common";
import { State } from "@/common/state.common";
import CreatePersonalProject from "@/components/app/personal/createPersonalProject.component";
import GetAllPersonalProject, {
	type getAllPersonalProjectProps,
} from "@/components/app/personal/getAllPersonalProject.component";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EQueryKey } from "@/definition/enums/queryKey.enum";
import type {
	ICreatePersonalProjectDtoIn,
	IGetAllPersonalProjectDtoOut,
} from "@/domain/dtos/personal/personal.dto";
import { todoAppPath } from "@/domain/paths/appPath/todo.appPath";
import { VCreatePersonalProjectDtoIn } from "@/domain/validations/personal/personal.validation";
import {
	useCreatePersonalProject,
	useGetAllPersonalProject,
} from "@/hooks/personal/personalProject.hook";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function PersonalProject() {
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
	 * * NAVIGATION
	 */
	const { home } = todoAppPath;

	/**
	 * * FORMS
	 */
	const createPersonalProjectFormDefaultBody = {
		project_name: "",
		project_deadline: "",
	};
	const createPersonalProjectForm = useForm<ICreatePersonalProjectDtoIn>({
		resolver: typeboxResolver(VCreatePersonalProjectDtoIn),
		defaultValues: createPersonalProjectFormDefaultBody,
		mode: "onSubmit",
	});

	const [info, setInfo] = useState();

	/**
	 * * QUERIES
	 */
	const createPersonalProjectMutation = useCreatePersonalProject();
	const {
		data: allPersonalProjectData,
		isLoading: allPersonalProjectIsLoading,
		error: allPersonalProjectError,
		refetch: allPersonalProjectRefetch,
	} = useGetAllPersonalProject();
	const queryClient = useQueryClient();

	/**
	 * * HANDLERS
	 */
	function createPersonalProjectHandler(
		createPersonalProjectForm: ICreatePersonalProjectDtoIn,
	) {
		createPersonalProjectMutation.mutate(createPersonalProjectForm, {
			onSuccess: async (res) => {
				if (res) {
					setAlertInfo({
						title: "Create personal project successful!",
						desc: `${createPersonalProjectForm.project_name} Have a nice achievement..`,
						type: "success",
					});

					await queryClient.invalidateQueries({
						queryKey: [EQueryKey.GET_ALL_PERSONAL_PROJECT],
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

	// console.log(allPersonalProjectData);
	return (
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
						<CardTitle>Create Personal Detail</CardTitle>
						<CardDescription>
							Here you can create your project and start activities.
						</CardDescription>
					</CardHeader>
					<CardContent className=" flex gap-2 ">
						{/* <Button>Create Personal Project</Button>
					<Button>Create Organize Project</Button> */}
						<CreatePersonalProject
							createPersonalProjectHandler={createPersonalProjectHandler}
							createPersonalProjectForm={createPersonalProjectForm}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
						/>
					</CardContent>
				</div>
				<State onRetry={allPersonalProjectRefetch}>
					<div className="w-full border p-2 flex flex-col justify-between items-center">
						<CardHeader className="w-full">
							<CardTitle>All your project</CardTitle>
							<CardDescription>
								Here you can see your all project.
							</CardDescription>
						</CardHeader>
						<CardContent className="w-full flex gap-2 ">
							<GetAllPersonalProject
								allPersonalProjectData={allPersonalProjectData}
								isLoading={allPersonalProjectIsLoading}
								error={allPersonalProjectError}
								refetch={allPersonalProjectRefetch}
							/>
						</CardContent>
					</div>
				</State>
			</div>
		</div>
	);
}
