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

const UserButton = () => {
	const { signOut } = useAuthActions();
	const { currentUser, isLoading } = useCurrentUser();
	if (isLoading) {
		return <Loader className='size-4 animate-spin text-muted-foreground' />;
	}
	if (!currentUser) return null;

	const { name, image } = currentUser;

	const avatarFallback = name?.charAt(0).toUpperCase();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='outline-none relative'>
				<Avatar className='size-10 hover:opacity-90 transition'>
					<AvatarImage src={image} alt={name} className='border rounded-full' />
					<AvatarFallback className='bg-blue-500 border border-spacing-4 border-blue-400 rounded-full text-3xl text-white'>
						{avatarFallback}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' side='bottom'>
				<DropdownMenuItem onClick={() => signOut()} disabled={isLoading}>
					<span className='flex items-center '>
						Logout
						<LogOutIcon className='ml-2' />
					</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default UserButton;
