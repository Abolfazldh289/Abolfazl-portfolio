import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abolfazl | Front-End Developer',
  description: 'Abolfazl — Front-End Developer building modern and interactive digital experiences.',
  openGraph: { title: 'Abolfazl | Front-End Developer', description: 'Code. Create. Innovate.', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
