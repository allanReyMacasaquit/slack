import useWorkspaceId from '@/hooks/workspace/use-workspace-id';
import { UseCurrentMember } from '../api/use-current-member';
import { UseGetWorkspace } from '../../workspaces/api/use-get-workspace';
import { AlertCircle, Loader } from 'lucide-react';
import WorkspaceLeftPanelHeader from './workspace-left-panel-header';

const WorkspaceLeftPanel = () => {
	const workspaceId = useWorkspaceId();

	const { data: member, isLoading: memberLoading } = UseCurrentMember({
		workspaceId,
	});
	const { data: workspace, isLoading: workspaceLoading } = UseGetWorkspace({
		id: workspaceId,
	});

	if (memberLoading || workspaceLoading) {
		return (
			<div className='flex flex-col h-screen items-center justify-center'>
				<Loader className='size-6 lg:size-10 text-muted-foreground animate-spin' />
			</div>
		);
	}

	if (!workspace || !member) {
		return (
			<div className='flex flex-col h-screen gap-y-2 items-center justify-center'>
				<AlertCircle className='size-6 lg:size-20 text-muted-foreground' />
				<p className='text-slate-400'>Workspace Not Found!</p>
			</div>
		);
	}

	return (
		<div className='flex flex-col h-screen'>
			<WorkspaceLeftPanelHeader
				workspace={workspace}
				isAdmin={member.role === 'admin'}
			/>
		</div>
	);
};
export default WorkspaceLeftPanel;
