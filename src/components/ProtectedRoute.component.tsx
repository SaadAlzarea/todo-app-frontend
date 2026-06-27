import { AuthenticationLocalStorage } from "@/data/authentication.localStorage";

import { routerAuthPaths } from "@/router/path.route";
import { Navigate } from "react-router-dom";

interface Props {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
	const { login } = routerAuthPaths;

	const token = AuthenticationLocalStorage.getToken();
	const role = AuthenticationLocalStorage.getRole();

	if (!token && !role) {
		return <Navigate to={login} replace />;
	}

	return <>{children}</>;
}
