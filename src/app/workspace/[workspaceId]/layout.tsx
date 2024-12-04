'use client';

import SearchBar from '@/components/features/workspaces/components/searchbar';
import Sidebar from '@/components/features/workspaces/components/sidebar';
import React from 'react';

interface WorkspaceIdLayoutProps {
	children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
	return (
		<div className='h-full'>
			<SearchBar />
			<main className='flex  w-full'>
				<Sidebar />
				{children}
			</main>
		</div>
	);
};

export default WorkspaceIdLayout;
