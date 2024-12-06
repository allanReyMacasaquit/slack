'use client';
import { useEffect, useMemo } from 'react';

import UserButton from '@/components/features/auth/components/user-button';
import { UseGetWorkspaces } from '@/components/features/workspaces/api/use-get-workspaces';
import { useCreateWorkspaceModal } from '@/components/features/modals/use-create-workpsace-modal';
import { useRouter } from 'next/navigation';

const Home = () => {
	const { data, isLoading } = UseGetWorkspaces();
	const [open, setOpen] = useCreateWorkspaceModal();
	const router = useRouter();

	const workspaceId = useMemo(() => data?.[0]?._id, [data]);

	useEffect(() => {
		if (isLoading) return;
		if (workspaceId) {
			console.log('Redirect to workspaces');
			router.replace(`/workspace/${workspaceId}`);
		} else if (!open) {
			setOpen(true);
			console.log('Open creation model');
		}
	}, [isLoading, workspaceId, open, setOpen, router]);
	return <div className='p-4'></div>;
};
export default Home;
