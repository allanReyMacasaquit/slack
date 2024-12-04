import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Home, Search, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
	return (
		<aside className='flex flex-col w-64 h-[calc(100vh-56px)] bg-[#1e6474]  text-white p-4'>
			{/* Header Section */}
			<div className='flex items-center gap-3 mb-6'>
				<Avatar>
					<AvatarImage src='/path-to-avatar.png' alt='User Avatar' />
				</Avatar>
				<div>
					<p className='text-sm font-semibold'>John Doe</p>
					<p className='text-xs text-gray-400'>john@example.com</p>
				</div>
			</div>

			{/* Navigation Links */}
			<nav className='flex flex-col gap-2'>
				<Button variant='ghost' className='flex items-center gap-2'>
					<Home className='h-5 w-5' />
					<span>Home</span>
				</Button>
				<Button variant='ghost' className='flex items-center gap-2'>
					<Search className='h-5 w-5' />
					<span>Search</span>
				</Button>
				<Button variant='ghost' className='flex items-center gap-2'>
					<Settings className='h-5 w-5' />
					<span>Settings</span>
				</Button>
			</nav>

			{/* Footer Section */}
			<div className='mt-auto'>
				<Button variant='ghost' className='flex items-center gap-2'>
					<LogOut className='h-5 w-5' />
					<span>Logout</span>
				</Button>
			</div>
		</aside>
	);
}
