import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import { AlignEndVertical } from "lucide-react";

export default function CommonAlert({
	show,
	AlertT,
	AlertD,
	variant = "default",
}: {
	show: boolean;
	AlertT?: string;
	AlertD?: string;
	variant?: "default" | "destructive";
}) {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 50 }}
					transition={{ duration: 0.4 }}
					className="fixed top-5 right-5 w-full max-w-sm z-50"
				>
					<Alert variant={variant} className="shadow-lg rounded-xl border">
						<AlignEndVertical className="h-5 w-5" />
						<AlertTitle>{AlertT}</AlertTitle>
						<AlertDescription>{AlertD}</AlertDescription>
					</Alert>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
