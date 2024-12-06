import { v } from 'convex/values';
import { mutation, query } from '../_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

const generateCode = () => {
	const characters = '0123456789';
	const code = Array.from(
		{ length: 6 },
		() => characters[Math.floor(Math.random() * characters.length)]
	).join('');

	return code;
};

export const get = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		// Fetch all members for the user
		const members = await ctx.db
			.query('members')
			.withIndex('by_user_id', (q) => q.eq('userId', userId))
			.collect();

		// Extract workspaceIds from members
		const workspaceIds = members.map((m) => m.workspaceId);

		// Fetch all workspaces in a single batch
		const workspaces = await Promise.all(
			workspaceIds.map((workspaceId) => ctx.db.get(workspaceId))
		);

		// Filter out null or undefined workspaces (in case some IDs are invalid)
		return workspaces.filter((workspace) => workspace !== null);
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

		const joinCode = generateCode();

		const workspaceId = await ctx.db.insert('workspaces', {
			userId,
			name: args.name,
			joinCode,
		});
		const workspace = await ctx.db.get(workspaceId);

		const membersId = await ctx.db.insert('members', {
			userId,
			workspaceId,
			role: 'admin',
		});

		return {
			workspaceId,
			membersId,
			workspace,
		};
	},
});

export const getById = query({
	args: { id: v.id('workspaces') },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new Error('Unathorized');
		}

		// Fetch all members for the userid and workspaceid
		const member = await ctx.db
			.query('members')
			.withIndex('by_workspace_id_and_user_id', (q) =>
				q.eq('workspaceId', args.id).eq('userId', userId)
			)
			.unique();

		if (!member) return null;

		return member;
	},
});
