'use client';
import { useEffect, useMemo } from 'react';

import UserButton from '@/components/features/auth/components/user-button';
import { UseGetWorkspaces } from '@/components/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/components/features/modals/use-create-workpsace-modal';

const Home = () => {
	const { data, isLoading } = UseGetWorkspaces();
	const [open, setOpen] = useCreateWorkspaceModal();

	const workspaceId = useMemo(() => data?.[0]?._id, [data]);

	useEffect(() => {
		if (isLoading) return;
		if (workspaceId) {
			console.log('Redirect to workspaces');
		} else if (!open) {
			setOpen(true);
			console.log('Open creation model');
		}
	}, [isLoading, workspaceId, open, setOpen]);
	return (
		<div className='p-4'>
			<UserButton />
		</div>
	);
};
export default Home;
