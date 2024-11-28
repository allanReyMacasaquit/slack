import { z } from 'zod';

export const formSchema = z
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
