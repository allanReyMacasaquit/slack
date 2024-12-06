import { useMutation } from 'convex/react';
import toast from 'react-hot-toast';
import { api } from '../../../../../convex/_generated/api';
import { useCallback, useMemo, useState } from 'react';
import { Id } from '../../../../../convex/_generated/dataModel';

type RequestType = {
	name: string;
};

type ResponseType = Id<'workspaces'> | null;

type Options = {
	onSuccess?: (data: Id<'workspaces'>) => void;
	onError?: (error: Error) => void;
	onSettled?: () => void;
	throwError?: boolean;
};

export function useCreateWorkspace() {
	const [data, setData] = useState<ResponseType | null>(null);
	const [error, setError] = useState<Error | null>(null);

	const [status, setStatus] = useState<
		'success' | 'error' | 'settled' | 'pending' | null
	>(null);

	const isError = useMemo(() => status === 'error', [status]);
	const isPending = useMemo(() => status === 'pending', [status]);
	const isSettled = useMemo(() => status === 'settled', [status]);
	const isSuccess = useMemo(() => status === 'success', [status]);

	const createWorkspace = useMutation(api.query.workspaces.create);

	const create = useCallback(
		async (
			values: RequestType,
			options?: Options
		): Promise<ResponseType | undefined> => {
			try {
				setData(null);
				setError(null);
				setStatus('pending');

				const result = await createWorkspace(values);

				// Show a success toast with workspace details
				toast.dismiss(); // Remove the loading toast
				toast.success('Workspace created successfully!');

				options?.onSuccess?.(result.workspaceId);
				return result.workspaceId;
			} catch (error) {
				// Show an error toast
				toast.dismiss();
				toast.error('Failed to create workspace');

				options?.onError?.(error as Error);
				if (options?.throwError) {
					throw error;
				}
			} finally {
				setStatus('settled');
				options?.onSettled?.();
			}
		},
		[createWorkspace]
	);

	return { create, data, error, isError, isPending, isSettled, isSuccess };
}
