"use client";

import type { LucideIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./sidebar";

export function NavHome({
	projects,
}: {
	projects: { name?: string; url?: string; icon?: LucideIcon }[];
}) {
	return (
		<SidebarGroup className="w-full">
			<SidebarMenu className="w-full gap-0.5">
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<a href={item.url}>
							<SidebarMenuButton
								asChild
								className="h-9 px-2.5 gap-2.5 flex-row items-center hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent w-full"
							>
								{item.icon && (
									<item.icon className="h-4 w-4 shrink-0 text-sidebar-foreground/60" />
								)}
								<span className="text-[13.5px]">{item.name}</span>
							</SidebarMenuButton>
						</a>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
