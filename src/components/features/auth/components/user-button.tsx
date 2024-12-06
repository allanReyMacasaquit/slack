import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthActions } from '@convex-dev/auth/react';
import { useCurrentUser } from '../api/use-current-user';
import { Loader, LogOutIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

const UserButton = () => {
	const { signOut } = useAuthActions();
	const { currentUser, isLoading } = useCurrentUser();
	if (isLoading) {
		return <Loader className='size-4 animate-spin text-muted-foreground' />;
	}
	if (!currentUser) return null;

	const { name, image } = currentUser;

	const avatarFallback = name?.charAt(0).toUpperCase();

	const handleSignout = async () => {
		await signOut();
		redirect('/auth');
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='outline-none relative'>
				<Avatar className='size-8 opacity-70 hover:opacity-100 transition'>
					<AvatarImage src={image} alt={name} className='border rounded-full' />
					<AvatarFallback className='bg-[#25741e] border border-spacing-4 rounded-full text-xl text-white'>
						{avatarFallback}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' side='right'>
				<DropdownMenuItem onClick={() => handleSignout()} disabled={isLoading}>
					<span className='flex items-center hover:cursor-pointer'>
						Logout
						<LogOutIcon className='ml-2' />
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default UserButton;
