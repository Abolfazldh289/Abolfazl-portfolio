import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'fa') notFound();
  return <div lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>{children}</div>;
}
