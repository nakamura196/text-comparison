'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          aria-label="Switch language"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          {locale === 'ja' ? '日本語' : 'English'}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[120px] rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
          sideOffset={5}
        >
          <DropdownMenu.Item
            className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100"
            onSelect={() => switchTo('ja')}
          >
            日本語
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100"
            onSelect={() => switchTo('en')}
          >
            English
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
