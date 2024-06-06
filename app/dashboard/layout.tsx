import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUser, logout } from '@/utils/auth';
import { BiNotepad } from 'react-icons/bi';
import { redirect } from 'next/navigation';

export default async ({ children }: { children: React.ReactNode }) => {
  const userSession = await getUser();
  if (!userSession.user) {
    redirect('/');
  }
  return (
    <>
      <header className='flex h-16 items-center justify-between border-b px-36 dark:bg-slate-950'>
        <div className='flex items-center gap-4 dark:text-white'>
          <BiNotepad className='size-6' />
          <nav className='flex items-center gap-2 text-sm font-medium'>
            <Link
              href='/dashboard'
              className='rounded px-2 py-1 transition-transform hover:-translate-y-[2px]'
            >
              Dashboard
            </Link>
            <Link
              href='/dashboard/blogs'
              className='rounded px-2 py-1 transition-transform hover:-translate-y-[2px]'
            >
              Blogs
            </Link>
          </nav>
        </div>
        <form action={logout}>
          <Button variant={'outline'}>Logout</Button>
        </form>
      </header>
      <main className='mx-36 mt-20'>{children}</main>
    </>
  );
};
