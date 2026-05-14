import { logoVWithoutBG } from "@/assets/global.d";
import CommonAlert from "@/common/alert.common";
import { FormErrorMessage } from "@/common/formError.common";
import { State } from "@/common/state.common";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { AuthenticationLocalStorage } from "@/data/authentication.localStorage";
import { EUserRole } from "@/definition/enums/auth.enum";
import type { IRegisterDtoIn } from "@/domain/dtos/auth.dto";
import { authAppPath } from "@/domain/paths/appPath/auth.appPath";
import { todoAppPath } from "@/domain/paths/appPath/todo.appPath";
import { VRegisterDtoIn } from "@/domain/validations/auth.validation";
import { ValidationMessages } from "@/domain/validations/validation.messages";
import { useRegister } from "@/hooks/auth.hook";
import { Button, Input } from "@base-ui/react";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	/**
	 * * GLOBAL
	 */
	const [alertInfo, setAlertInfo] = useState<{
		title: string;
		desc: string;
		type: "success" | "error";
	} | null>(null);
	const [showAlert, setShowAlert] = useState(false);

	/**
	 * * NAVIGATE
	 */
	const navigate = useNavigate();
	const { home } = todoAppPath;
	const { login } = authAppPath;

	/**
	 * * FORM
	 */
	const defaultBody = {
		username: "",
		email: "",
		password: "",
		role: EUserRole.USER,
	};

	const form = useForm<IRegisterDtoIn>({
		resolver: typeboxResolver(VRegisterDtoIn),
		defaultValues: defaultBody,
		mode: "onSubmit",
		reValidateMode: "onSubmit",
	});

	/**
	 * * QUERY
	 */
	const registerMutation = useRegister();

	/**
	 * * FUNCTIONS
	 */
	function registerHandler(formBody: IRegisterDtoIn) {
		registerMutation.mutate(formBody, {
			onSuccess: (res) => {
				if (res) {
					AuthenticationLocalStorage.setToken(res.token);
					AuthenticationLocalStorage.setRole(res.role);

					setAlertInfo({
						title: "Registration successful!",
						desc: "Have a nice achievement..",
						type: "success",
					});

					setShowAlert(true);

					setTimeout(() => {
						setShowAlert(false);
						navigate(home);
					}, 1500);
				} else {
					setAlertInfo({
						title: "Registration failed!",
						desc: "Please try again.",
						type: "error",
					});
				}
			},
			onError: (err) => {
				setAlertInfo({
					title: "Registration failed",
					desc: `${err}` || "Something went wrong.",
					type: "error",
				});
				setShowAlert(true);
			},
		});
	}
	return (
		<State
		//  isLoading={registerIsPending} error={registerError}
		>
			<CommonAlert
				show={showAlert}
				AlertT={alertInfo?.title}
				AlertD={alertInfo?.desc}
				variant={alertInfo?.type === "error" ? "destructive" : "default"}
			/>
			<div className="flex max-w-screen min-h-screen items-center justify-center gap-10  text-[#F5F3E7]">
				<div className="w-120 flex flex-col gap-2 items-start justify-center h-200">
					<div>
						<img src={logoVWithoutBG} alt="Logo" className="h-20" />
					</div>
					<p className="text-5xl font-bold ">
						HOW TO MANAGE A <br /> NEW BUSINESS
					</p>
					<p className="text-3xl underline">individual and organization</p>
					<p className="text-stone-400 font-normal">
						Create your tasks, set deadlines, and track your progress with ease.
						UrTodo's intuitive interface allows you to prioritize your work,
						collaborate with your team, and stay organized. Whether you're
						managing a personal project or leading a team, UrTodo provides the
						tools you need to succeed.
					</p>
				</div>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(registerHandler)}>
						<div className=" border-2 border-[#F5F3E7]  w-100 max-w-md  flex flex-col gap-6 p-5">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Username</FormLabel>
										<FormControl>
											<Input
												className="bg-background placeholder:text-sm text-sm p-1  placeholder:text-muted-foreground h-6  border border-[#F5F3E7]"
												placeholder="spngebob squarepants"
												{...field}
											/>
										</FormControl>
										<FormErrorMessage
											error={form.formState.errors.username?.message}
											message={ValidationMessages.username}
										/>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Email</FormLabel>
										<FormControl>
											<Input
												className="bg-background placeholder:text-sm text-sm p-1  placeholder:text-muted-foreground h-6  border border-[#F5F3E7]"
												placeholder="spngebob.doe@example.com"
												{...field}
											/>
										</FormControl>
										<FormErrorMessage
											error={form.formState.errors.email?.message}
											message={ValidationMessages.email}
										/>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-md">Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												className="bg-background placeholder:text-sm text-sm p-1  placeholder:text-muted-foreground h-6  border border-[#F5F3E7]"
												placeholder="••••••••"
												{...field}
											/>
										</FormControl>
										{/* <FormMessage className="text-xs" /> */}
										<FormErrorMessage
											error={form.formState.errors.password?.message}
											message={ValidationMessages.password}
										/>
									</FormItem>
								)}
							/>
							<div className="w-full space-y-4">
								<Button
									type="submit"
									className="border-2 border-[#F5F3E7] px-10 py-4 text-sm font-bold tracking-[4px] uppercase hover:bg-[#F5F3E7] hover:text-black transition-colors cursor-pointer w-full"
								>
									Register
								</Button>
								<p className="text-center text-muted-foreground text-sm">
									Already have an account?{" "}
									<Link to={login} className="hover:underline">
										<span className="text-[#F5F3E7] font-semibold">
											Sign in
										</span>
									</Link>
								</p>
							</div>
						</div>
					</form>
				</FormProvider>
			</div>
		</State>
	);
}
