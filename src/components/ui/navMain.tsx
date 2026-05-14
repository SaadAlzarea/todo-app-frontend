import { type LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
} from "./sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./collapsible";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: { title: string; url: string; role?: string | string[] }[];
	}[];
}) {
	return (
		<SidebarGroup className="w-full">
			<SidebarMenu className="gap-0.5">
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible w-full"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									tooltip={item.title}
									className={cn(
										"h-9  px-2.5 gap-2.5 w-full",
										"hover:bg-sidebar-accent",
										"data-[state=open]:bg-sidebar-accent",
									)}
								>
									{item.icon && (
										<span
											className={cn(
												"flex h-7 w-7 shrink-0 items-center justify-center ",
												"group-data-[state=open]/collapsible:border group-data-[state=open]/collapsible:border-sidebar-border",
												"group-data-[state=open]/collapsible:bg-sidebar text-sidebar-foreground/60",
												"group-data-[state=open]/collapsible:text-sidebar-foreground",
											)}
										>
											<item.icon className="h-4 w-4" />
										</span>
									)}
									<span className="text-[13.5px] font-normal group-data-[state=open]/collapsible:font-medium">
										{item.title}
									</span>
									<ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 text-sidebar-foreground/40 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>

							<CollapsibleContent>
								<SidebarMenuSub className="ml-[34px] border-l border-sidebar-border pl-0 gap-px">
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<a href={subItem.url}>
												{" "}
												<SidebarMenuSubButton
													asChild
													className="relative h-8 rounded-lg pl-2.5 text-[13px] text-sidebar-foreground/60 hover:text-sidebar-foreground data-[active=true]:text-sidebar-foreground data-[active=true]:font-medium data-[active=true]:bg-sidebar-accent before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-3.5 before:w-0.5 before:rounded-full before:bg-sidebar-foreground before:opacity-0 data-[active=true]:before:opacity-100"
												>
													<span>{subItem.title}</span>
												</SidebarMenuSubButton>{" "}
											</a>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
