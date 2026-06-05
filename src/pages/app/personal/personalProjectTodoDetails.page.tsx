import { State } from "@/common/state.common";
import PersonalProjectTodoAction from "@/components/app/personal/personalProjectTodoAction.components";
import PersonalProjectForOneTodoDetails from "@/components/app/personal/personalProjectTodoDetails.components";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { IGetPersonalProjectTodoDetailsDtoIn } from "@/domain/dtos/personal/personal.dto";
import { VPersonalProjectTodoGetTodoDetailsDtoIn } from "@/domain/validations/personal/personal.validation";
import { useGetPersonalProjectTodoDetails } from "@/hooks/personal/personalProject.hook";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import React, { useState } from "react";
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

	/**
	 * * FORM
	 */

	const personalProjectTodoDetailsDefaultValues = {
		todo_id: id,
	};

	const PersonalProjectTodoDetailsForm =
		useForm<IGetPersonalProjectTodoDetailsDtoIn>({
			resolver: typeboxResolver(VPersonalProjectTodoGetTodoDetailsDtoIn),
			defaultValues: { ...personalProjectTodoDetailsDefaultValues },
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

	return (
		<State
			isLoading={personalProjectTodoDetailsIsLoading}
			error={personalProjectTodoDetailsError}
			onRetry={personalProjectTodoDetailsRefetch}
		>
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
						<PersonalProjectTodoAction />
					</CardContent>
				</div>
			</div>
		</State>
	);
}
