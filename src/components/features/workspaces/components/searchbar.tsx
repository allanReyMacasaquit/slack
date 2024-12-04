import { Button } from '@/components/ui/button';
import useWorkspaceId from '@/hooks/workspace/use-workspace-id';
import { Info, Search } from 'lucide-react';
import { UseGetWorkspace } from '../api/use-get-workspace';

export default function SearchBar() {
	const workspaceId = useWorkspaceId();
	const { data } = UseGetWorkspace({ id: workspaceId });
	return (
		<nav className='bg-[#1e6474] flex items-center justify-between h-14 p-4'>
			{/* Left Section */}
			<div className='flex-1' />

			{/* Center Section */}
			<div className='flex items-center w-full'>
				<Button className='bg-accent/10 hover:bg-accent/15 w-full lg:min-w-[950px] justify-start'>
					<Search />
					<span className='text-white text-lg'>
						Search Workspace Name : {data?.name}
					</span>
				</Button>
			</div>

			{/* Right Section */}
			<div className='ml-auto flex-1 flex items-center justify-end'>
				<Button className='bg-transparent hover:bg-transparent hover:scale-110'>
					<Info />
				</Button>
			</div>
		</nav>
	);
}
