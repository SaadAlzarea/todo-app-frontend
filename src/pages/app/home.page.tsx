import { logoVWithoutBG } from "@/assets/global.d";
import { Users2, Mails } from "lucide-react";

export default function Home() {
	return (
		<div className="flex min-h-full items-center justify-center p-10">
			<div className="flex flex-col gap-5 max-w-lg w-full">
				<div className="flex items-end gap-2.5">
					<img
						src={logoVWithoutBG}
						alt="The Lending Hub"
						className="h-7 object-contain"
					/>
					<span className="text-xs uppercase tracking-widest text-muted-foreground">
						Your Todo ..
					</span>
				</div>

				<div className="flex flex-col gap-1.5">
					<p className="text-2xl font-medium text-foreground">
						Welcome back, Saad
					</p>
					<p className="text-sm text-muted-foreground leading-relaxed">
						Here's what's happening across your platform today. Explore the
						features and stay on top of updates.
					</p>
				</div>

				<div className="grid grid-cols-3 gap-2.5">
					{[
						{ label: "Total Users", href: "/admin/user-table" },
						{ label: "Notifications", href: "/admin/notifications" },
						{ label: "PEP Users", href: "/admin/pepuser" },
					].map((stat) => (
						<a
							key={stat.label}
							href={stat.href}
							className="bg-muted rounded-lg p-3.5 flex flex-col gap-1 hover:bg-muted/80 transition-colors"
						>
							<span className="text-[11px] text-muted-foreground uppercase tracking-wide">
								{stat.label}
							</span>
							<span className="text-lg font-medium text-foreground">—</span>
						</a>
					))}
				</div>

				<div className="flex items-center gap-2">
					<a
						href="/admin/user-table"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-lg px-3.5 py-1.5 hover:bg-muted transition-colors"
					>
						<Users2 className="h-4 w-4" /> Manage users
					</a>
					<a
						href="/admin/notifications"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-lg px-3.5 py-1.5 hover:bg-muted transition-colors"
					>
						<Mails className="h-4 w-4" /> Notifications
					</a>
				</div>
			</div>
		</div>
	);
}
