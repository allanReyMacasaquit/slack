import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { ConvexClientProvider } from '@/components/features/provider/ConvexClientProvider';
const inter = Inter({ subsets: ['latin'] });

import { Toaster } from 'react-hot-toast';
import Modal from '@/components/features/modals/modal';
export const metadata: Metadata = {
	title: 'Planning Center',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ConvexAuthNextjsServerProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ConvexClientProvider>
						<Toaster position='top-right' />
						<Modal />
						{children}
					</ConvexClientProvider>
				</body>
			</html>
		</ConvexAuthNextjsServerProvider>
	);
}
