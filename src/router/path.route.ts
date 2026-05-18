import dashboard from "@/pages/app/global/dashboard.page";

export const routerAuthPaths = {
	mainAuthPath: "/auth",
	login: "user/login",
	register: "user/register",
};

export const routerAppPaths = {
	mainAppPath: "/todo-app",
	home: "dashboard/home",
	dashboard: "dashboard/dashboard",
	personalProject: "dashboard/personal-project",
	personalProjectTodo: "dashboard/personal-project/:id",
};
