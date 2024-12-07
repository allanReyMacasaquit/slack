import React from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './tooltip';
interface Props {
	label: string;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	children: React.ReactNode;
}
const Hint = ({ children, label, align, side }: Props) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					align={align}
					className='bg-[#26912d] text-white border p-2 my-1'
				>
					<p className='font-medium text-sm'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default Hint;
