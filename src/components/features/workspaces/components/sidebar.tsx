import { BellIcon, Home, MessageSquare, MoreHorizontal } from 'lucide-react';
import UserButton from '../../auth/components/user-button';
import SidebarButton from './sidebar-button';
import WorkspaceSwitcher from './workspace-switcher';

export default function Sidebar() {
	return (
		<aside className='flex flex-col h-[calc(100vh-56px)] bg-[#1e6474] text-white py-4'>
			<WorkspaceSwitcher />
			<SidebarButton icon={Home} label='Home' isActive />
			<SidebarButton icon={MessageSquare} label='DM' />
			<SidebarButton icon={BellIcon} label='Activity' />
			<SidebarButton icon={MoreHorizontal} label='More' />
			<div className='flex justify-center mt-auto hover:cursor-pointer'>
				<UserButton />
			</div>
		</aside>
	);
}
