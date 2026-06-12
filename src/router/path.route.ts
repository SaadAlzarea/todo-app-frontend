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
	// * PERSONAL
	personalProject: "dashboard/personal-project",
	personalProjectTodo: "dashboard/personal-project/:id",
	personalProjectTodoDetails: "dashboard/personal-project/todo-details/:id",
	// * GROUP
	group: "dashboard/group",
	groupDetails: "dashboard/group/group-details/:id",
	groupMember: "dashboard/group/group-details/group-member/:id",
};
