import { Button } from '@/components/ui/button';
import useWorkspaceId from '@/hooks/workspace/use-workspace-id';
import { Info, Search } from 'lucide-react';
import { UseGetWorkspace } from '../api/use-get-workspace';
import Mobile from './mobile';
import { useState } from 'react';

export default function SearchBar() {
	const workspaceId = useWorkspaceId();
	const { data } = UseGetWorkspace({ id: workspaceId });

	const [showMobile, setShowMobile] = useState(false);

	const toggleMobile = () => {
		setShowMobile((prev) => !prev);
	};

	return (
		<nav className='z-50 bg-[#1e6474] flex items-center justify-between h-14 p-4'>
			{/* Left Section */}
			<div className='flex-1' />

			{/* Center Section */}
			<div className='flex items-center w-full overflow-auto'>
				<Button className='lg:bg-accent/10 lg:hover:bg-accent/15 w-full lg:min-w-[570px] xl:min-w-[750px] justify-start'>
					<Search />
					<span className='text-white text-lg'>{data?.name}</span>
				</Button>
			</div>

			{/* Right Section */}
			<div className='ml-auto flex-1 lg:hidden flex items-center justify-end'>
				<Button
					onClick={toggleMobile}
					className='bg-transparent hover:bg-transparent hover:scale-110'
				>
					<Info />
				</Button>
				{showMobile && <Mobile />}
			</div>
		</nav>
	);
}
