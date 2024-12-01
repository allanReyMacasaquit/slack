import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogHeader,
} from '@/components/ui/dialog';
import { useCreateWorkspaceModal } from './use-create-workpsace-modal';
import { Button } from '@/components/ui/button';

const CreateWorkspaceModal = () => {
	const [open, setOpen] = useCreateWorkspaceModal();

	const onOpenChange = () => {
		setOpen(false);
	};
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<DialogTitle>Create Workspace</DialogTitle>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a New Workspace</DialogTitle>
				</DialogHeader>

				<DialogDescription>
					Enter the details for your new workspace.
				</DialogDescription>

				{/* Add form fields here */}

				<div className='flex justify-between'>
					<DialogClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DialogClose>
					<Button>Create</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateWorkspaceModal;
