import UserButton from '../../auth/components/user-button';
import WorkspaceSwitcher from './workspace-switcher';

export default function Sidebar() {
	return (
		<aside className='flex flex-col w-16 h-[calc(100vh-56px)] bg-[#1e6474] text-white py-4'>
			<WorkspaceSwitcher />
			<div className='flex justify-center mt-auto hover:cursor-pointer'>
				<UserButton />
			</div>
		</aside>
	);
}
