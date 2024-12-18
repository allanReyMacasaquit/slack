import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

export const UseGetWorkspaces = () => {
	const data = useQuery(api.query.workspaces.get);
	const isLoading = data === undefined;

	return { data, isLoading };
};
