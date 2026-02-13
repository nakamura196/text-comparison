import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import '../globals.css';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://iiif-text.netlify.app';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`))
    .default;

  const title = messages.site_name;
  const description = messages.hero_description;
  const ogImageUrl = `${BASE_URL}/img/ogp/og-image.png`;

  return {
    title: {
      default: title,
      template: `%s - ${title}`,
    },
    description,
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/img/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/img/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/img/icons/favicon-48.png', sizes: '48x48', type: 'image/png' },
      ],
      apple: '/img/icons/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      siteName: title,
      title,
      description,
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    keywords:
      locale === 'ja'
        ? ['IIIF', 'テキスト比較', '差分', '編集距離', 'デジタルアーカイブ', '古典籍']
        : ['IIIF', 'text comparison', 'diff', 'edit distance', 'digital archive', 'manuscripts'],
    other: {
      'format-detection': 'telephone=no, email=no, address=no',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} prefix="og: http://ogp.me/ns#">
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster position="bottom-center" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
