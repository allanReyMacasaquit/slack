import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('workspaces').collect();
	},
});

// create a new workspace api
export const create = mutation({
	args: { name: v.string() },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new Error('Unathorized');
		}
		//TODO: create joinCode method later
		const joinCode = '123456';

		const workspaceId = await ctx.db.insert('workspaces', {
			userId,
			name: args.name,
			joinCode,
		});
		const workspace = await ctx.db.get(workspaceId);

		return {
			workspaceId,
			workspace,
		};
	},
});
