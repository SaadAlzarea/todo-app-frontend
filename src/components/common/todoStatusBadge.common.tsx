import { Badge } from "@/components/ui/badge";

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
	active: "default",
	"in-progress": "secondary",
	in_progress: "secondary",
	done: "default",
	pending: "outline",
};

type TodoStatusBadgeProps = {
	status: string | null | undefined;
};

export default function TodoStatusBadge({ status }: TodoStatusBadgeProps) {
	if (!status) return null;

	return (
		<Badge
			variant={statusVariant[status] ?? "outline"}
			className="text-[10px] px-1.5 py-0"
		>
			{status}
		</Badge>
	);
}
