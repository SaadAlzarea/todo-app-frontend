export default function IsLoading() {
	return (
		<div className="w-full flex items-center justify-center">
			<div className="flex items-center justify-center min-h-screen gap-2">
				<div className="w-4 h-4  bg-black dark:bg-white animate-bounce [animation-delay:.7s]"></div>
				<div className="w-4 h-4  bg-black dark:bg-white animate-bounce [animation-delay:.3s]"></div>
				<div className="w-4 h-4  bg-black dark:bg-white animate-bounce [animation-delay:.7s]"></div>
			</div>
		</div>
	);
}
