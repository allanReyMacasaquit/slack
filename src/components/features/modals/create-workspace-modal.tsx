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
import { useState } from 'react';

const CreateWorkspaceModal = () => {
	const [open, setOpen] = useCreateWorkspaceModal();
	const [workspaceName, setWorkspaceName] = useState(''); // State to store the workspace name
	const [isLoading] = useState(false);
	const onOpenChange = () => {
		setOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle workspace creation logic here, like sending the workspaceName to an API
		console.log('Workspace created:', workspaceName);
		// Optionally, close the modal after submission
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a New Workspace</DialogTitle>
				</DialogHeader>

				<DialogDescription>Enter Workspace Name</DialogDescription>

				{/* Form to create a new workspace */}
				<form onSubmit={handleSubmit}>
					<div className='space-y-4'>
						{/* Input field for workspace name */}
						<Input
							disabled={isLoading}
							type='text'
							placeholder="Workspace Name e.g 'Work', 'Personal', 'Home'"
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
