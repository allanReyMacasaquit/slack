import { Button } from '@/components/ui/button';
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
import { formSchema } from '@/schema';
import { useAuthActions } from '@convex-dev/auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthType } from '../types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';

const SignIn = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [state] = useState<AuthType>('signIn');
	const { signIn } = useAuthActions();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			confirm_password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsLoading(true);

		try {
			// Sign In or Sign Up action
			await signIn('password', {
				email: data.email,
				password: data.password,
				flow: 'signIn',
			});

			toast.success(`Signed In successfully!`);
		} catch (error) {
			if (error) toast.error(`Failed to Sign In - Wrong Email/Password`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className='text-xl flex items-center lg:mt-0 lg:text-4xl font-semibold'>
				<Image
					src='/images/Illustration.svg'
					height={100}
					width={100}
					alt='Welcome Illustration'
					priority
				/>
				{state === 'signIn' ? 'Sign In' : 'Sign Up'}
			</div>
			<Separator className='bg-white my-5 lg:my-10' />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='lg:space-y-0 bg-slate-50 p-4 rounded-lg'
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
										type='email'
										placeholder='john.doe@gmail.com'
										{...field}
										className='rounded-lg shadow-lg'
										aria-required='true'
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
										aria-required='true'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
							) : (
								'Sign In'
							)}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default SignIn;
