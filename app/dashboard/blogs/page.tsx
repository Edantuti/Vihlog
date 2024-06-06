import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { IoTrashBin } from 'react-icons/io5';

export default () => {
  return (
    <>
      <h1 className='my-4 text-xl font-medium'>Blogs</h1>
      <section className=''>
        <article className='relative w-96 rounded border'>
          <div className='absolute right-2 top-2 flex items-center gap-2'>
            <Button variant={'secondary'} className='px-4 py-1'>
              <Link href='/dashboard/blogs/laskdjgasdf/edit'>
                <FaEdit />
              </Link>
            </Button>
            <Button
              variant={'destructive'}
              className='group px-4 py-1 shadow-inner'
            >
              <IoTrashBin />
            </Button>
          </div>
          <img
            src=''
            alt=''
            className='h-40 w-full overflow-hidden bg-blue-200'
          />
          <div className='mx-4 my-2 space-y-2'>
            <h4>Life could be dream</h4>
            <p className='text-xs'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              minus, harum rerum id dignissimos voluptates. Ea in similique
              dolor commodi nam facere at deleniti ipsum rem quaerat. Ea,
              molestias? Repudiandae.
            </p>
          </div>
        </article>
      </section>
    </>
  );
};
