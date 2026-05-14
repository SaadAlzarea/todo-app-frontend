import IsLoading from "@/components/ui/IsLoading";
import type { MouseEventHandler } from "react";

export type StateProps = {
	isLoading?: boolean;
	error?: unknown;
	isEmpty?: boolean;
	onRetry?: () => void;
	children: React.ReactNode;
};

type ErrorLike = { name?: string; message?: string } | Error;

// const defaultSpinner = (
// 	<div className="flex items-center justify-center py-16">
// 		<div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
// 		<span className="ml-3 text-sm text-gray-500">Loading…</span>
// 	</div>
// );

function toErrorLike(err: unknown): ErrorLike {
	if (err instanceof Error) return err;
	if (
		typeof err === "object" &&
		err !== null &&
		("message" in err || "name" in err)
	) {
		return err as ErrorLike;
	}
	return { name: "Error", message: String(err) };
}

const DefaultErrorUI = (
	error: ErrorLike,
	retry: MouseEventHandler<HTMLButtonElement> | undefined,
) => (
	<div className="mx-auto my-6 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
		<div className="flex items-start">
			{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				className="mt-0.5 h-5 w-5 flex-shrink-0"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 00-1.5 0v5a.75.75 0 001.5 0v-5zm0 8a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
					clipRule="evenodd"
				/>
			</svg>
			<div className="ml-3">
				<p className="font-semibold">{error.name || "Something went wrong"}</p>
				<p className="mt-1 text-sm opacity-90">
					{error.message || "An unexpected error occurred."}
				</p>
				{retry && (
					// biome-ignore lint/a11y/useButtonType: <explanation>
					<button
						onClick={retry}
						className="mt-3 rounded-xl border px-3 py-1.5 text-sm transition hover:bg-red-100"
					>
						Try again
					</button>
				)}
			</div>
		</div>
	</div>
);

const DefaultEmptyUI = (
	<div className="mx-auto my-10 max-w-md text-center text-gray-500">
		<p className="text-base font-medium">No data</p>
		<p className="mt-1 text-sm">Try adjusting filters or refresh.</p>
	</div>
);

export function State({
	isLoading,
	error,
	isEmpty,
	onRetry,
	children,
}: StateProps) {
	if (isLoading) return <IsLoading />;

	if (error) return <>{DefaultErrorUI(toErrorLike(error), onRetry)}</>;

	if (isEmpty) return <>{DefaultEmptyUI}</>;

	return <>{children}</>;
}
