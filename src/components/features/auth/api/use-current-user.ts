import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

export const useCurrentUser = () => {
	// Fetch user data using the Convex client
	const currentUser = useQuery(api.user.current);
	const isLoading = currentUser === undefined;

	return { currentUser, isLoading };
};
