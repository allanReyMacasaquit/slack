'use client';

import WorkspaceLeftPanel from '@/components/features/members/components/workspace-left-panel';
import SearchBar from '@/components/features/workspaces/components/searchbar';
import Sidebar from '@/components/features/workspaces/components/sidebar';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import React from 'react';

interface WorkspaceIdLayoutProps {
	children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
	return (
		<div>
			<SearchBar />
			<main className='flex h-[calc(100vh-56px)]'>
				<Sidebar />
				<div className='w-full'>
					<ResizablePanelGroup direction='horizontal' autoSaveId='arm'>
						<ResizablePanel
							defaultSize={28}
							minSize={8}
							className='bg-[#1b5967] p-5 lg:p-4'
						>
							<div className='text-white'>
								<WorkspaceLeftPanel />
							</div>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel
							defaultSize={50}
							minSize={50}
							className='px-4 lg:px-4 pt-5'
						>
							{children}
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			</main>
		</div>
	);
};

export default WorkspaceIdLayout;
