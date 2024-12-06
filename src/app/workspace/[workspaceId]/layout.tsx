'use client';

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
							defaultSize={25}
							minSize={11}
							className='bg-[#1b5967] p-5 lg:p-4'
						>
							<div className='flex justify-center text-white'>
								<span className='mx-auto'>Content</span>
							</div>
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel minSize={50} className='px-4 lg:px-4 pt-5'>
							{children}
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			</main>
		</div>
	);
};

export default WorkspaceIdLayout;
