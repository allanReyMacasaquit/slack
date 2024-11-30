import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';

const SociaLogin = () => {
	const { signIn } = useAuthActions();
	const [pendingStates, setPendingStates] = useState<Record<string, boolean>>(
		{}
	);
	const handleButtonClick = async (
		buttonKey: string,
		action: () => Promise<void>
	) => {
		setPendingStates((prev) => ({ ...prev, [buttonKey]: true })); // Start pending
		try {
			await action();
		} finally {
			setPendingStates((prev) => ({ ...prev, [buttonKey]: false })); // Reset pending
		}
	};
	return (
		<div className='flex flex-col items-center space-y-4'>
			<span className='text-sm'>Continue with</span>
			<Button
				onClick={() =>
					handleButtonClick('google', async () => {
						await signIn('google');
					})
				}
				className='bg-google w-full lg:w-2/3 hover:bg-google/90'
				disabled={pendingStates['google']}
			>
				<FcGoogle size={24} />
				{pendingStates['google'] ? (
					<Loader size={14} className='animate-spin' />
				) : (
					'Google'
				)}
			</Button>
			<Button
				onClick={() =>
					handleButtonClick('github', async () => {
						await signIn('github');
					})
				}
				className='bg-github w-full lg:w-2/3 hover:bg-github/90'
				disabled={pendingStates['github']}
			>
				<SiGithub size={24} />
				{pendingStates['github'] ? (
					<Loader size={14} className='animate-spin' />
				) : (
					'GitHub'
				)}
			</Button>
		</div>
	);
};
export default SociaLogin;
