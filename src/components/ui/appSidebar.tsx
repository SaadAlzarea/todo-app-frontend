import { Sidebar, SidebarHeader, SidebarContent } from "./sidebar";
import { NavUser } from "./navUser";
import { NavProjects } from "./navProject";
import {
	Users2,
	Mails,
	Home,
	LayoutDashboard,
	Group,
	PersonStanding,
	Calendar,
	Settings,
} from "lucide-react";

const data = {
	user: {
		name: "Saad",
		email: "salzarea@thelendinghub.sa",
	},
	navMain: [
		{
			title: "Groups",
			url: "#",
			icon: Users2,
			isActive: true,
			items: [
				{ title: "All Users", url: "/admin/user-table" },
				{ title: "Pep User", url: "/admin/pepuser" },
			],
		},
	],
	home: [{ name: "Home", url: "/", icon: Home }],
	items: [
		{ name: "Home", url: "/todo-app/dashboard/home", icon: Home },
		{
			name: "Dashboard",
			url: "/todo-app/dashboard/dashboard",
			icon: LayoutDashboard,
		},
		{
			name: "Personal",
			url: "/todo-app/dashboard/personal-project",
			icon: PersonStanding,
		},
		{ name: "Organize", url: "/todo-app/notifications", icon: Group },
		{ name: "Calender", url: "/todo-app/notifications", icon: Calendar },
		{ name: "Settings", url: "/todo-app/notifications", icon: Settings },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			{/* <SidebarHeader className="border-b border-sidebar-border px-3 py-3"></SidebarHeader> */}

			<SidebarContent className="w-full px-2 py-2">
				<NavUser user={data.user} />
				{/* <NavHome projects={data.home} /> */}
				{/* <SidebarSeparator className="mx-2 my-1" /> */}
				{/* <NavMain items={data.navMain} /> */}
				{/* <SidebarSeparator className="mx-2 my-1" /> */}
				<NavProjects projects={data.items} />
			</SidebarContent>

			{/* <div className="mt-auto border-t border-sidebar-border px-2 py-2">
				
			</div> */}

			{/* <SidebarRail /> */}
		</Sidebar>
	);
}
