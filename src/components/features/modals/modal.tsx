'use client';

import { useEffect, useState } from 'react';
import CreateWorkspaceModal from './create-workspace-modal';

const Modal = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	return (
		<>
			<CreateWorkspaceModal />
		</>
	);
};
export default Modal;
