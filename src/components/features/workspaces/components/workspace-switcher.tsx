import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Loader, Plus } from 'lucide-react';
import useWorkspaceId from '@/hooks/workspace/use-workspace-id';
import { UseGetWorkspace } from '../api/use-get-workspace';
import { UseGetWorkspaces } from '../api/use-get-workspaces';
import { useCreateWorkspaceModal } from '../../modals/use-create-workpsace-modal';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

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
		<div className='flex items-center border opacity-70 size-10 rounded-full mx-auto mb-10'>
			<DropdownMenu>
				<DropdownMenuLabel className=' hidden lg:block absolute lg:top-3 lg:bottom-10 lg:left-9'>
					<p className='text-lg'>Select Workspace</p>
					<span>
						<ChevronDown className='animate-bounce' />
					</span>
				</DropdownMenuLabel>
				<DropdownMenuTrigger
					asChild
					className='outline-none relative overflow-hidden'
				>
					<Button className='size-10 opacity-80 hover:opacity-100 rounded-full bg-accent/10 hover:bg-accent/15'>
						<span className='text-lg'>
							{workspaceLoading ? (
								<Loader className='size-5 animate-spin' />
							) : workspace?.name ? (
								workspace.name.charAt(0).toUpperCase()
							) : (
								'?'
							)}
						</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side='right'
					align='start'
					className='w-auto ml-3 lg:ml-8 border shadow-lg -mt-4 rounded-none'
				>
					<DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
					<Separator />
					<DropdownMenuItem
						onClick={() => router.push(`/workspace/${workspaceId}`)}
						className='flex flex-col justify-start items-start capitalize cursor-pointer'
					>
						<span className='text-sm text-muted-foreground'>
							Active Workspace
						</span>
						<h1 className='text-lg trucate w-64 lg:w-full px-4'>
							{workspace?.name}
						</h1>
						<Separator />
					</DropdownMenuItem>
					{filteredWorkspaces?.map((workspace) => (
						<DropdownMenuItem
							key={workspace._id}
							className='capitalize cursor-pointer'
							onClick={() => router.push(`/workspace/${workspace._id}`)}
						>
							<span className='border rounded-full size-8 flex items-center justify-center bg-[#1e6474] text-white '>
								{workspace.name.charAt(0).toUpperCase()}
							</span>
							<span className='truncate w-64 lg:w-full'>{workspace.name}</span>
						</DropdownMenuItem>
					))}
					<Separator />
					<DropdownMenuItem
						className='cursor-pointer flex items-center justify-center'
						onClick={() => setOpen(true)}
					>
						<div className='overflow-hidden relative'>
							<Plus />
						</div>
						<p className='text-lg'>Create</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
