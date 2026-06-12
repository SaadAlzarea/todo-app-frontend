import { LogOut, ChevronsUpDown } from "lucide-react";
import { userInfoStored } from "@/store/userInfo.store";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuGroup,
} from "./dropdown-menu";
import {
	useSidebar,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "./sidebar";
import { useNavigate } from "react-router-dom";
import { AuthenticationLocalStorage } from "@/data/authentication.localStorage";
import { authAppPath } from "@/domain/paths/appPath/auth.appPath";

function getInitials(name?: string) {
	if (!name) return "?";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function NavUser() {
	const navigate = useNavigate();
	const { login } = authAppPath;
	const { isMobile } = useSidebar();
	const { userInfo } = userInfoStored();

	const handleLogout = () => {
		AuthenticationLocalStorage.clearToken();
		AuthenticationLocalStorage.clearRole();
		navigate(login);
	};

	return (
		<SidebarMenu className="w-full">
			<SidebarMenuItem className="w-full">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium">
								{getInitials(userInfo?.username)}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{userInfo?.username}
								</span>
								<span className="truncate text-xs text-sidebar-foreground/60">
									{userInfo?.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4 shrink-0 text-sidebar-foreground/40" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-2 py-2">
									<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium">
										{getInitials(userInfo?.username)}
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">
											{userInfo?.username}
										</span>
										<span className="truncate text-xs text-muted-foreground">
											{userInfo?.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={handleLogout}
								className="text-destructive focus:text-destructive"
							>
								<LogOut className="mr-2 h-4 w-4" />
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
