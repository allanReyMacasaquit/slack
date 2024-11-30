'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import SociaLogin from './social-login';
import SignIn from './sign-in';
import SignUp from './sign-up';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthType } from '../types';

const AuthScreen = () => {
	const [authMode, setAuthMode] = useState<AuthType>('signIn');
	return (
		<div className='flex h-full my-10 lg:my-0'>
			{/* Left side: Image Section */}
			<div className='hidden lg:flex lg:w-2/4 items-center bg-blue-100 border-r-2 shadow-lg justify-center'>
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
					{/* Social Login Buttons */}
					<SociaLogin />
					<Separator className='bg-white my-5 lg:my-10' />
					{/* Dynamically Render SignIn or SignUp */}
					{authMode === 'signIn' ? <SignIn /> : <SignUp />}
					<p className='mt-4 text-sm text-gray-500 text-center'>
						{authMode === 'signIn' ? (
							<>
								Don&apos;t have an account?{' '}
								<Button
									variant='link'
									onClick={() => setAuthMode('signUp')}
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
									onClick={() => setAuthMode('signIn')}
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
