// convex/_generated/server.ts or wherever your backend code is located
import { v } from 'convex/values';
import { query } from '../_generated/server';

export const checkEmail = query({
	args: { email: v.string() },
	handler: async (ctx, { email }) => {
		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('email'), email))
			.first();
		return user !== null; // Returns true if email exists, false otherwise
	},
});
