import { z } from 'zod';

export const formSchema = z
	.object({
		name: z
			.string()
			.min(2, 'Name is required')
			.max(50, 'Name must be at most 50 characters')
			.optional(),
		email: z
			.string()
			.email('Invalid email format')
			.max(50, 'Email must be at most 50 characters'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.max(50, 'Password must be at most 50 characters'),
		confirm_password: z.string().optional(), // Optional by default, but must match password if provided
	})
	.refine(
		(data) => !data.confirm_password || data.password === data.confirm_password,
		{
			message: 'Passwords must match',
			path: ['confirm_password'], // Error appears under confirm_password
		}
	);
