import { BellIcon, Home, MessageSquare, MoreHorizontal } from 'lucide-react';
import UserButton from '../../auth/components/user-button';
import SidebarButton from './sidebar-button';
import WorkspaceSwitcher from './workspace-switcher';

export default function Mobile() {
	return (
		<>
			<aside className='lg:hidden flex absolute top-14 left-0 flex-col h-[calc(100vh-56px)] bg-[#1e6474] text-white py-4 z-50'>
				<WorkspaceSwitcher />
				<div className='flex flex-col items-center'>
					<SidebarButton icon={Home} label='Home' isActive />
					<SidebarButton icon={MessageSquare} label='Message' />
					<SidebarButton icon={BellIcon} label='Activity' />
					<SidebarButton icon={MoreHorizontal} label='More' />
				</div>
				<div className='flex justify-center mt-auto hover:cursor-pointer'>
					<UserButton />
				</div>
			</aside>
		</>
	);
}
