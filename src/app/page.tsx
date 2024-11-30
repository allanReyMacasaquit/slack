'use client';

import UserButton from '@/components/features/auth/components/user-button';
import { UseGetWorkspaces } from '@/components/features/workspaces/api/use-get-workspaces';
import { useEffect, useMemo } from 'react';

const Home = () => {
	const { data, isLoading } = UseGetWorkspaces();

	const workspaceId = useMemo(() => data?.[0]?._id, [data]);

	useEffect(() => {
		if (isLoading) return;
		if (workspaceId) {
			console.log('Redirect to workspaces');
		} else {
			console.log('Open creation model');
		}
	}, [isLoading, workspaceId]);
	return (
		<div className='p-4'>
			<UserButton />
		</div>
	);
};
export default Home;
