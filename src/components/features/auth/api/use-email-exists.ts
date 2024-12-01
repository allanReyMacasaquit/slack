import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

export const useEmailExists = (email: string) => {
	const currentEmail = useQuery(api.checkEmailExists.checkEmail, { email });

	const isLoading = currentEmail === undefined;

	return { currentEmail, isLoading };
};
