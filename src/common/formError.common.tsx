type Props = {
	error: string | undefined;
	message: string;
};

export function FormErrorMessage({ error, message }: Props) {
	const hasError = !!error;

	if (!hasError) return null;

	return <div className=" text-red-400 text-xs p-0 m-0">{message}</div>;
}
