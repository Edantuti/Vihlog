import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUser, logout } from '@/utils/auth';
import { BiNotepad } from 'react-icons/bi';
import { SiVercel } from 'react-icons/si';
import { redirect } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export default async ()=>{
    const userSession = await getUser();
    if (!userSession.user) {
        redirect('/');
    }
    return (
        <header className='flex h-16 items-center justify-between border-b px-36 dark:bg-slate-950'>
        <div className='flex items-center gap-4 dark:text-white'>
          <BiNotepad className='size-6' />
          <nav className='flex items-center gap-2 text-sm font-medium'>
            <Link
              href='/dashboard'
              className='rounded px-2 py-1 hover:bg-gray-200'
            >
              Dashboard
            </Link>
            <Link
              href='/dashboard/blogs'
              className='rounded px-2 py-1 hover:bg-gray-200'
            >
              Blogs
            </Link>
          </nav>
        </div>
        <div className='flex items-center gap-5'>
          <DropdownMenu >
          <DropdownMenuTrigger className="rounded-full"><img
            src={userSession.user.photo}
            alt='Profile'
            className='h-10 w-10 rounded-full'
          />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
            <Link href="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
            <Link href="https://vercel.com/integrations/lmao-testing/new" ><DropdownMenuItem className="bg-black m-2 text-white group hover:text-black flex items-center text-sm gap-2"><SiVercel className=" fill-white group-hover:fill-black" /> Connect to Vercel</DropdownMenuItem></Link>

          </DropdownMenuContent>
          </DropdownMenu>
          <form action={logout}>
            <Button variant={'outline'}>Logout</Button>
          </form>
        </div>
      </header>
    )
}