import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogHeader,
} from '@/components/ui/dialog';
import { useCreateWorkspaceModal } from './use-create-workpsace-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateWorkspace } from '../workspaces/api/use-create-workspace';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CreateWorkspaceModal = () => {
	const { create, isPending } = useCreateWorkspace();
	const [open, setOpen] = useCreateWorkspaceModal();
	const [workspaceName, setWorkspaceName] = useState('');

	const onOpenChange = () => {
		setOpen(false);
		setWorkspaceName('');
	};

	const router = useRouter();

	const handleCreateForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			create(
				{ name: workspaceName },
				{
					onSuccess: (data) => {
						console.log('Workspace Created:', data);
						router.push(`/workspace/${data}`);
						onOpenChange();
					},
					onError: () => {
						console.error('Error creating workspace');
					},
					onSettled: () => {
						console.log('Create workspace operation settled');
					},
				}
			);
		} catch (error) {
			if (error) {
				toast.error('API: Disconnected!');
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a New Workspace</DialogTitle>
				</DialogHeader>

				<DialogDescription>Enter Workspace Name</DialogDescription>

				{/* Form to create a new workspace */}
				<form onSubmit={handleCreateForm}>
					<div className='space-y-4'>
						{/* Input field for workspace name */}
						<Input
							disabled={isPending}
							type='text'
							placeholder="e.g 'Programs', 'Worship', 'Prayer', 'Preaching', 'etc..'"
							value={workspaceName}
							minLength={3}
							autoFocus
							onChange={(e) => setWorkspaceName(e.target.value)} // Update state on input change
							required
						/>
					</div>

					{/* Action buttons */}
					<div className='flex justify-between mt-4'>
						{/* Using `asChild` to prevent DialogClose from rendering its own button */}
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						<Button type='submit' disabled={!workspaceName}>
							Create
						</Button>
						{/* Disabled if workspace name is empty */}
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateWorkspaceModal;
