import { Badge } from "@/components/ui/badge";

const priorityVariant: Record<string, "default" | "secondary" | "destructive"> =
	{
		critical: "destructive",
		high: "destructive",
		medium: "default",
		low: "secondary",
	};

const priorityClassName: Record<string, string> = {
	critical: "bg-red-700 text-white",
	high: "bg-orange-500 text-white",
	medium: "",
	low: "",
};

type TodoPriorityBadgeProps = {
	priority: string | null | undefined;
};

export default function TodoPriorityBadge({
	priority,
}: TodoPriorityBadgeProps) {
	if (!priority) return null;

	return (
		<Badge
			variant={priorityVariant[priority] ?? "secondary"}
			className={`text-[10px] px-1.5 py-0 ${priorityClassName[priority] ?? ""}`}
		>
			{priority}
		</Badge>
	);
}
