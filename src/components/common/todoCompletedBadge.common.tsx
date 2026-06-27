import { Badge } from "@/components/ui/badge";

type TodoCompletedBadgeProps = {
	isCompleted: boolean;
};

export default function TodoCompletedBadge({
	isCompleted,
}: TodoCompletedBadgeProps) {
	if (!isCompleted) return null;

	return (
		<Badge className="text-[10px] px-1.5 py-0 bg-green-700 text-white">
			Completed
		</Badge>
	);
}
