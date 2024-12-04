'use client';
import { UseGetWorkspace } from '@/components/features/workspaces/api/use-get-workspace';
import useWorkspaceId from '@/hooks/workspace/use-workspace-id';

const WorkspaceIdPage = () => {
	const workspaceId = useWorkspaceId();
	const { data } = UseGetWorkspace({ id: workspaceId });
	return (
		<div className='w-full overflow-x-auto'>
			WorkspaceIdPage: {JSON.stringify(data)}
		</div>
	);
};
export default WorkspaceIdPage;
