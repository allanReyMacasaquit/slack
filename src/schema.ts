import { z } from 'zod';

export const formSchema = z
	.object({
		state: z.enum(['SignIn', 'SignUp']), // State determines whether it's Sign In or Sign Up
		email: z.string().email('Invalid email').max(50),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(50),
		confirm_password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(50)
			.optional(), // Optional by default, required for SignUp later
	})
	.refine(
		(data) => {
			// Enforce confirm_password only if the state is SignUp
			return data.state === 'SignUp'
				? data.password === data.confirm_password
				: true;
		},
		{
			message: 'Passwords must match',
			path: ['confirm_password'], // Error appears under confirm_password
		}
	);
