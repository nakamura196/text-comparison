'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';

interface AppBarProps {
  onInputClick?: () => void;
  onCopyClick?: () => void;
  showInput?: boolean;
  showCopy?: boolean;
}

export function AppBar({
  onInputClick,
  onCopyClick,
  showInput = false,
  showCopy = false,
}: AppBarProps) {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-base font-semibold text-gray-900 transition hover:text-indigo-600"
        >
          {t('site_name')}
        </Link>

        <div className="flex items-center gap-2">
          {showInput && (
            <button
              onClick={onInputClick}
              className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              {t('input')}
            </button>
          )}
          {showCopy && (
            <button
              onClick={onCopyClick}
              className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              {t('url')}
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
