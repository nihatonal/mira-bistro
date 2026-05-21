'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { type Locale } from '@/i18n';
import { LanguageSwitcher } from '../language/LanguageSwitcher';

type AdminMobileMenuProps = {
  locale: Locale;
};

export function AdminMobileMenu({ locale }: AdminMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className=" left-4 top-4 z-[99] flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold text-white shadow-gold lg:hidden"
        aria-label="Open admin menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={`fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm transition lg:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 z-[140] h-screen w-[280px] transform bg-dark-surface shadow-2xl transition duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
          aria-label="Close admin menu"
        >
          <X className="h-5 w-5" />
        </button>

        <AdminSidebar locale={locale} mobile />
        <LanguageSwitcher currentLocale={locale} variant="light" />
      </aside>
    </>
  );
}