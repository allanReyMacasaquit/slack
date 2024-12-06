import { getAuthUserId } from '@convex-dev/auth/server';
import { query } from '../_generated/server';

// Query to get the current user
export const current = query({
	args: {}, // No arguments required
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);

		if (userId === null) return null;

		return await ctx.db.get(userId);
	},
});
