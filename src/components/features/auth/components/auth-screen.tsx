'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { z } from 'zod';

import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';

import { useAuthActions } from '@convex-dev/auth/react';

import { toast } from 'react-hot-toast';
import { api } from '../../../../../convex/_generated/api';

// Validation Schema
const formSchema = z.object({
	email: z.string().email('Invalid email').max(50),
	password: z.string().min(8, 'Password must be at least 8 characters').max(50),
	confirm_password: z.string().optional(),
});

const AuthScreen = () => {
	const [state, setState] = useState<'SignIn' | 'SignUp'>('SignIn');
	const [isLoading, setIsLoading] = useState(false);
	const [pendingStates, setPendingStates] = useState<Record<string, boolean>>(
		{}
	);
	const { signIn } = useAuthActions();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			confirm_password: '',
		},
	});

	const setPendingState = (action: string, isPending: boolean) => {
		setPendingStates((prev) => ({
			...prev,
			[action]: isPending,
		}));
	};
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
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		const action = state === 'SignIn' ? 'signIn' : 'signUp';
		setPendingState(action, true);
		setIsLoading(true);

		try {
			// For Sign Up, validate password confirmation
			if (state === 'SignUp' && data.password !== data.confirm_password) {
				toast.error("Passwords don't match");
				return;
			}

			// Check if email already exists during SignUp
			if (state === 'SignUp') {
				const emailExists = api.queries.checkEmailExists;
				if (emailExists) {
					toast.error(
						'Email already registered. Please sign in or use a different email.'
					);
					return; // Prevent further action if the email already exists
				}
			}

			// Sign In or Sign Up
			await signIn('password', {
				email: data.email,
				password: data.password,
				flow: state === 'SignIn' ? 'signIn' : 'signUp',
			});

			toast.success(
				`${state === 'SignIn' ? 'Signed In' : 'Signed Up'} successfully!`
			);
		} catch (error) {
			console.error('Error:', error);
			toast.error(`Failed to ${state === 'SignIn' ? 'Sign In' : 'Sign Up'}`);
		} finally {
			setPendingState(action, false);
			setIsLoading(false);
		}
	};

	return (
		<div className='flex h-screen'>
			{/* Left side: Image Section */}
			<div className='hidden lg:flex lg:w-2/3 bg-blue-200 items-center justify-center'>
				<div className='text-center space-y-10'>
					<Image
						src='/images/Illustration.svg'
						height={300}
						width={300}
						alt='Welcome Illustration'
						priority
					/>
					<h1 className='text-4xl font-bold'>Welcome!</h1>
					<p className='text-lg text-gray-600'>
						Explore our gallery of amazing images.
					</p>
				</div>
			</div>

			{/* Right side: Auth Form */}
			<div className='auth-container'>
				<div className='w-full md:w-2/3 lg:shadow-md lg:p-6 rounded-lg'>
					<h2 className='text-xl mt-20 lg:mt-0 lg:text-4xl font-semibold mb-4'>
						{state === 'SignIn' ? 'Sign In' : 'Sign Up'}
					</h2>

					<Separator className='bg-white my-5 lg:my-10' />

					{/* Social Login Buttons */}
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

					<Separator className='bg-white my-5 lg:my-10' />

					{/* Email/Password Form */}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-6 bg-slate-50 p-4 rounded-lg'
						>
							{/* Email Field */}
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='john.doe@gmail.com'
												{...field}
												className='rounded-lg shadow-lg'
												aria-required
											/>
										</FormControl>
										<FormDescription>
											We&apos;ll never share your email with anyone.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Password Field */}
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='********'
												{...field}
												className='rounded-lg shadow-lg'
												aria-required
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Confirm Password Field (only for SignUp) */}
							{state === 'SignUp' && (
								<FormField
									control={form.control}
									name='confirm_password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<Input
													type='password'
													placeholder='********'
													{...field}
													className='rounded-lg shadow-lg'
													aria-required
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{/* Submit Button */}
							<div className='flex justify-center'>
								<Button
									disabled={isLoading}
									type='submit'
									className='w-full lg:w-2/3 mt-4 flex justify-center items-center'
								>
									{isLoading ? (
										<div className='flex items-center space-x-2'>
											<Loader size={16} className='animate-spin' />
											<p>Loading...</p>
										</div>
									) : state === 'SignIn' ? (
										'Sign In'
									) : (
										'Sign Up'
									)}
								</Button>
							</div>
						</form>
					</Form>

					{/* Toggle SignIn/SignUp */}
					<p className='mt-4 text-sm text-gray-500 text-center'>
						{state === 'SignIn' ? (
							<>
								Don&apos;t have an account?{' '}
								<Button
									variant='link'
									onClick={() => setState('SignUp')}
									className='text-blue-600 hover:underline'
								>
									Sign Up
								</Button>
							</>
						) : (
							<>
								Already have an account?{' '}
								<Button
									variant='link'
									onClick={() => setState('SignIn')}
									className='text-blue-600 hover:underline'
								>
									Sign In
								</Button>
							</>
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthScreen;
