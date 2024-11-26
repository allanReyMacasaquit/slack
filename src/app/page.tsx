import { Button } from '@/components/ui/button';

const Home = () => {
	return (
		<div className='flex flex-col space-y-4'>
			<Button variant='default'>default</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='destructive'>destructive</Button>
			<Button variant='link'>Link</Button>
		</div>
	);
};
export default Home;
