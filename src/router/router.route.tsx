import { SidebarProvider } from "@/components/ui/sidebar";
import Home from "@/pages/app/global/home.page";
import Login from "@/pages/auth/login.auth";
import Register from "@/pages/auth/register.page";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AuthLayout from "./layout/authLayout.layout";
import AppLayout from "./layout/appLayout.layout";
import { routerAppPaths, routerAuthPaths } from "./path.route";
import Dashboard from "@/pages/app/global/dashboard.page";
import PersonalProject from "@/pages/app/personal/personalProject.page";
import PersonalProjectTodo from "@/pages/app/personal/personalProjectTodo.page";

const { mainAuthPath, login, register } = routerAuthPaths;
const { mainAppPath, home, dashboard, personalProject, personalProjectTodo } =
	routerAppPaths;

const router = createBrowserRouter([
	{
		path: mainAuthPath,
		element: <AuthLayout />,
		children: [
			{ path: login, element: <Login /> },
			{ path: register, index: true, element: <Register /> },
		],
	},
	{
		path: mainAppPath,
		element: <AppLayout />,
		children: [
			{ path: home, element: <Home /> },
			{ path: dashboard, element: <Dashboard /> },
			{ path: personalProject, element: <PersonalProject /> },
			{ path: personalProjectTodo, element: <PersonalProjectTodo /> },
		],
	},
]);

function Router() {
	return <RouterProvider router={router} />;
}

export default Router;
