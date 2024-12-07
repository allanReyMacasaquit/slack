import React from 'react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, ListFilterIcon, SquarePenIcon } from 'lucide-react';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { Separator } from '@/components/ui/separator';
import Hint from '@/components/ui/hint';

interface WorkspaceLeftPanelHeaderProps {
	workspace: Doc<'workspaces'>;
	isAdmin: boolean;
}

const WorkspaceLeftPanelHeader = ({
	workspace,
	isAdmin,
}: WorkspaceLeftPanelHeaderProps) => {
	return (
		<div className='flex flex-col items-center justify-center w-full mx-auto'>
			<h2 className='hidden lg:flex text-lg font-semibold mx-2'>
				Organization
			</h2>
			<div className='w-16 flex-col lg:flex  items-center justify-center lg:w-[500px]'>
				<div className='flex items-center justify-center my-4'>
					<Hint label='New Messages' side='top' align='center'>
						<Button variant='secondary' className='lg:flex lg:min-w-96 px-1 '>
							<SquarePenIcon className='mx-1' />
						</Button>
					</Hint>
				</div>

				<div className='flex items-center justify-center my-4'>
					<Hint label='Filter' side='top' align='center'>
						<Button variant='secondary' className='lg:flex lg:min-w-96 px-1 '>
							<ListFilterIcon className='mx-1' />
						</Button>
					</Hint>
				</div>

				<Separator className='bg-muted-foreground my-4 mb-6' />
				<div className='flex justify-between items-center px-4 h-[49px] gap-0.5'>
					<DropdownMenu>
						<DropdownMenuTrigger
							asChild
							className='border-none active:border-none active:outline-none outline-none rounded w-[40px] px-1'
						>
							<Button className='lg:flex bg:transparent shadow-2xl lg:min-w-96 px-2'>
								<span className='hidden lg:flex truncate w-[80px] '>
									{workspace.name}
								</span>
								<span className=''>
									<ChevronDown />
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='bottom'
							align='center'
							className='w-80 lg:w-[500px] mt-1 bg-[#1e6474] border-none text-white shadow-lg rounded-none lg:rounded-2xl p-2'
						>
							<DropdownMenuItem
								className='bg-[#216f81] p-2 rounded-none lg:rounded-full cursor-pointer'
								onClick={() => console.log('Workspace 2 selected')}
							>
								<div className='flex items-center justify-center overflow-auto border border-spacing-4 border-[#1b5b6a] rounded-full size-10 w-16 lg:w-10'>
									{workspace.name.charAt(0).toUpperCase()}
								</div>
								<div className='flex flex-col items-start overflow-auto'>
									<h2 className='tracking-widest'>{workspace.name}</h2>
									<p className='text-green-400'>Active</p>
								</div>
							</DropdownMenuItem>

							{isAdmin && (
								<>
									<DropdownMenuSeparator className='bg-slate-500 w-[440px] p-[1px] rounded-full my-2 mx-auto' />
									<DropdownMenuItem className='bg-[#216f81] rounded-none lg:rounded-full cursor-pointer p-2'>
										<div className='tracking-widest flex text-center items-center justify-center'>
											Invite people to:
											<span className='underline underline-offset-4 ml-2 text-start'>
												{workspace.name}
											</span>
										</div>
									</DropdownMenuItem>
									<DropdownMenuSeparator className='bg-slate-500 w-[440px] p-[1px] rounded-full my-2 mx-auto' />
									<DropdownMenuItem className='bg-[#216f81] rounded-none lg:rounded-full cursor-pointer p-2'>
										<div className='tracking-widest flex text-center items-center justify-center'>
											<span className='underline underline-offset-4 ml-2 text-start'>
												Preferences
											</span>
										</div>
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default WorkspaceLeftPanelHeader;
