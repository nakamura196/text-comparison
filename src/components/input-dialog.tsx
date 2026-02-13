'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';
import type { InputValue } from '@/types';

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: [InputValue, InputValue]) => void;
  onExample: () => void;
}

export function InputDialog({
  open,
  onOpenChange,
  onSubmit,
  onExample,
}: InputDialogProps) {
  const t = useTranslations();
  const [values, setValues] = useState<[InputValue, InputValue]>([
    { manifest: '', canvas: '', label: '' },
    { manifest: '', canvas: '', label: '' },
  ]);

  function updateValue(
    index: number,
    field: keyof InputValue,
    value: string,
  ) {
    setValues((prev) => {
      const next = [...prev] as [InputValue, InputValue];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function handleClear() {
    setValues([
      { manifest: '', canvas: '', label: '' },
      { manifest: '', canvas: '', label: '' },
    ]);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl focus:outline-none">
          <Dialog.Title className="text-xl font-semibold text-gray-900">
            {t('input_form')}
          </Dialog.Title>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[0, 1].map((index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  {t(index === 0 ? 'left' : 'right')}
                </h3>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    {t('manifest')} *
                  </label>
                  <input
                    type="text"
                    value={values[index].manifest}
                    onChange={(e) =>
                      updateValue(index, 'manifest', e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    {t('canvas')}{' '}
                    <span className="text-gray-400">({t('optional')})</span>
                  </label>
                  <input
                    type="text"
                    value={values[index].canvas}
                    onChange={(e) =>
                      updateValue(index, 'canvas', e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    {t('label')}{' '}
                    <span className="text-gray-400">({t('optional')})</span>
                  </label>
                  <input
                    type="text"
                    value={values[index].label}
                    onChange={(e) =>
                      updateValue(index, 'label', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onSubmit(values)}
              className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              {t('submit')}
            </button>
            <button
              onClick={() => {
                onExample();
                onOpenChange(false);
              }}
              className="rounded-full bg-sky-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-600"
            >
              {t('example')}
            </button>
            <button
              onClick={handleClear}
              className="rounded-full bg-amber-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-600"
            >
              {t('clear')}
            </button>
            <Dialog.Close asChild>
              <button className="rounded-full bg-gray-700 px-6 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800">
                {t('close')}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
