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
import { z } from 'zod';

import { FcGoogle } from 'react-icons/fc';
import { SiGithub } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

import { AuthType } from '../types';

const formSchema = z
	.object({
		email: z.string().email('Invalid email').max(50),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(50),
		confirm_password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(50),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Passwords must match',
		path: ['confirm_password'],
	});

const AuthScreen = () => {
	const [state, setState] = useState<AuthType>('SignIn');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			confirm_password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// Handle form submission
		console.log(values);
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
						<Button className='bg-google w-full lg:w-2/3 hover:bg-google/90'>
							<FcGoogle size={24} /> Google
						</Button>
						<Button className='bg-github w-full lg:w-2/3 hover:bg-github/90'>
							<SiGithub size={24} /> GitHub
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
								<Button type='submit' className='w-full lg:w-2/3 mt-4'>
									{state === 'SignIn' ? 'Sign In' : 'Sign Up'}
								</Button>
							</div>
						</form>
					</Form>

					{/* Toggle SignIn/SignUp */}
					<p className='mt-4 text-sm text-gray-500 text-center mb-6 lg:mb-0'>
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