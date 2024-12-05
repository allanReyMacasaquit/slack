import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { IconType } from 'react-icons';

interface SidebarButtonProps {
	icon: LucideIcon | IconType;
	label: string;
	isActive?: boolean;
	onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
	icon: Icon,
	label,
	isActive,
	onClick,
}) => {
	return (
		<div className='my-2'>
			<Button
				onClick={onClick}
				className={`flex flex-col items-center justify-center gap-1 p-1 lg:p-6 transition-colors 
                ${isActive ? 'bg-[#1e6474] text-white ' : ''}`}
			>
				<Icon />
				<span className='text-sm'>{label}</span>
			</Button>
		</div>
	);
};

export default SidebarButton;
