import { query } from '../../convex/_generated/server';
import { v } from 'convex/values';

export const checkEmailExists = query({
	args: { email: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('email'), args.email))
			.first();
		return user !== null;
	},
});
