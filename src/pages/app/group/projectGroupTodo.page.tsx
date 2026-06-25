import CommonAlert from "@/common/alert.common";
import { State } from "@/common/state.common";
import AssignTodoInGroupProjectWithAttachment from "@/components/app/group/assignTodoInGroupProjectWithAttachment.component";
import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ICreateAssignTodoInGroupProjectDtoIn } from "@/domain/dtos/group/group.dto";
import { VCreateAssignTodoInGroupProjectDtoIn } from "@/domain/validations/group/group.validation";
import { useCreateNewGroupProjectAssignTodoWithAttachment } from "@/hooks/group/group.hook";
import { useAssignTodoInfo } from "@/store/createAssignTodo.store";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
	const assignTodoDefaultValue = {
		group_id: undefined,
		project_id: undefined,
		assign_to: [],
		title: undefined,
		body: undefined,
		priority: undefined,
		status: undefined,
		deadline: undefined,
	};
	const assignTodoForm = useForm<ICreateAssignTodoInGroupProjectDtoIn>({
		resolver: typeboxResolver(VCreateAssignTodoInGroupProjectDtoIn),
		defaultValues: assignTodoDefaultValue,
		mode: "onSubmit",
	});

	/**
	 * * QUERIES
	 */
	const assignTodoMutation = useCreateNewGroupProjectAssignTodoWithAttachment();

	/**
	 * * HANDLERS
	 */

	function assignTodoHandler(
		assignTodoForm: ICreateAssignTodoInGroupProjectDtoIn,
	) {
		console.log(assignTodoForm);
		assignTodoMutation.mutate(assignTodoForm, {
			onSuccess: () => {
				setAlertInfo({
					title: "Create personal project todo successful!",
					desc: `${assignTodoForm.title} Have a nice achievement..`,
					type: "success",
				});

				setShowAlert(true);
				setAssignTodoState(false);

				setTimeout(() => {
					setShowAlert(false);
					// navigate(home);
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

	/**
	 * * EFFECT
	 */
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
		<State>
			<div>
				<CommonAlert
					show={showAlert}
					AlertT={alertInfo?.title}
					AlertD={alertInfo?.desc}
					variant={alertInfo?.type === "error" ? "destructive" : "default"}
				/>
				<div className=" flex flex-col gap-2">
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
						<div className="w-full border p-2 flex justify-between items-center">
							<CardHeader className="w-full">
								<CardTitle>Actions in your group</CardTitle>
								<CardDescription>
									Here you can create new project with your team and start and
									add new member activities.
								</CardDescription>
							</CardHeader>
							<CardContent className=" flex gap-2 ">
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
						<CardHeader className="w-full">
							<CardTitle>All Project</CardTitle>
							<CardDescription>
								Here you can see your all your groups.
							</CardDescription>
						</CardHeader>
						<CardContent className="w-full flex gap-2 "></CardContent>
					</div>
				</div>
			</div>
		</State>
	);
}
