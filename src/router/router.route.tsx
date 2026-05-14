import { SidebarProvider } from "@/components/ui/sidebar";
import Home from "@/pages/app/home.page";
import Login from "@/pages/auth/login.auth";
import Register from "@/pages/auth/register.page";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AuthLayout from "./layout/authLayout.layout";
import AppLayout from "./layout/appLayout.layout";
import { routerAppPaths, routerAuthPaths } from "./path.route";

const { mainAuthPath, login, register } = routerAuthPaths;
const { mainAppPath, home } = routerAppPaths;

const router = createBrowserRouter([
	{
		path: mainAuthPath,
		element: <AuthLayout />,
		children: [
			{ path: login, element: <Login /> },
			{ path: register, element: <Register /> },
		],
	},
	{
		path: mainAppPath,
		element: <AppLayout />,
		children: [{ path: home, element: <Home /> }],
	},
]);

function Router() {
	return <RouterProvider router={router} />;
}

export default Router;
