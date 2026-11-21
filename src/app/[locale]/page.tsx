import { notFound } from 'next/navigation';
import Portfolio from '@/components/Portfolio';
import type { Locale } from '@/lib/content';

export function generateStaticParams() { return [{ locale: 'en' }, { locale: 'fa' }]; }
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'fa') notFound();
  return <Portfolio locale={locale as Locale} />;
}
