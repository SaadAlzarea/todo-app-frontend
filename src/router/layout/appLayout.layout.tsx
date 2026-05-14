import { AppSidebar } from "@/components/ui/appSidebar";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import {
	SidebarProvider,
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@base-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
	return (
		<SidebarProvider defaultOpen={isSidebarOpen}>
			<AppSidebar />
			<SidebarInset className="overflow-x-hidden">
				<header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
					<Separator orientation="vertical" className="h-5" />
					<BreadcrumbPage className="font-semibold text-lg">
						Yoor Todo App
					</BreadcrumbPage>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<Card className="w-full h-full border-none shadow-none rounded-xl bg-muted/6">
						<CardContent className="max-w-full h-full">
							<Outlet />
						</CardContent>
					</Card>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
