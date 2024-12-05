import { Button } from '@/components/ui/button';
import useWorkspaceId from '@/hooks/workspace/use-workspace-id';
import { Info, Search } from 'lucide-react';
import { UseGetWorkspace } from '../api/use-get-workspace';
import Mobile from './mobile';
import { useEffect, useRef, useState } from 'react';

export default function SearchBar() {
	const workspaceId = useWorkspaceId();
	const { data } = UseGetWorkspace({ id: workspaceId });

	const [showMobile, setShowMobile] = useState(false);
	const mobileRef = useRef<HTMLDivElement>(null);

	const toggleMobile = () => {
		setShowMobile((prev) => !prev);
	};

	// Close the Mobile component when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			// Close if the click is outside both Mobile and Info button
			if (mobileRef.current && !mobileRef.current.contains(target)) {
				setShowMobile(false);
			}
		};

		if (showMobile) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showMobile]);
	return (
		<nav className='bg-[#1e6474] flex items-center justify-between h-14 p-4'>
			{/* Left Section */}
			<div className='flex-1' />

			{/* Center Section */}
			<div className='flex items-center w-full overflow-auto'>
				<Button className='lg:bg-accent/10 lg:hover:bg-accent/15 w-full lg:min-w-[950px] justify-start'>
					<Search />
					<span className='text-white text-lg'>
						Search Workspace Name : {data?.name}
					</span>
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
				{showMobile && (
					<div ref={mobileRef}>
						<Mobile />
					</div>
				)}
			</div>
		</nav>
	);
}
