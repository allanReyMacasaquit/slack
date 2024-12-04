import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Loader, Plus } from 'lucide-react';
import useWorkspaceId from '@/hooks/workspace/use-workspace-id';
import { UseGetWorkspace } from '../api/use-get-workspace';
import { UseGetWorkspaces } from '../api/use-get-workspaces';
import { useCreateWorkspaceModal } from '../../modals/use-create-workpsace-modal';
import { useRouter } from 'next/navigation';

export default function WorkspaceSwitcher() {
	const router = useRouter();
	const workspaceId = useWorkspaceId();

	const { data: workspaces, isLoading: workspacesLoading } = UseGetWorkspaces();
	const { data: workspace, isLoading: workspaceLoading } = UseGetWorkspace({
		id: workspaceId,
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [open, setOpen] = useCreateWorkspaceModal();

	const filteredWorkspaces = workspaces?.filter(
		(workspace) => workspace._id !== workspaceId
	);
	return (
		<div className='flex items-center active:border size-12 rounded-full mx-auto'>
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className='outline-none relative overflow-hidden'
				>
					<Button className='size-12 rounded-full   bg-accent/10 hover:bg-accent/15'>
						<span className='text-lg'>
							{workspaceLoading ? (
								<Loader className='size-5 animate-spin' />
							) : (
								workspace?.name.charAt(0).toUpperCase()
							)}
						</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side='bottom' align='start' className='w-64'>
					<DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => router.push(`/workspace/${workspaceId}`)}
						className='flex flex-col justify-start items-start capitalize cursor-pointer'
					>
						{workspace?.name}
						<span className='text-sm text-muted-foreground'>
							Active Workspace
						</span>
					</DropdownMenuItem>
					{filteredWorkspaces?.map((workspace) => (
						<DropdownMenuItem
							key={workspace._id}
							className='capitalize cursor-pointer'
							onClick={() => router.push(`/workspace/${workspace._id}`)}
						></DropdownMenuItem>
					))}
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => setOpen(true)}
					>
						<div className='overflow-hidden relative'>
							<Plus />
						</div>
						Create a new workspace
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
