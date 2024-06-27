import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { IoTrashBin } from 'react-icons/io5';
import { deleteFn } from '@/app/actions/blog/actions';
export default ({name,description, blogId}:{name:string, description:string, blogId:string})=>{
    const deleteFnW = deleteFn.bind(null,blogId);
    return (
        <article className='relative w-96 rounded border'>
          <div className='absolute right-2 top-2 flex items-center gap-2'>
            <Link href={`blogs/${name}/edit`}>
              <Button variant={'secondary'} className='px-4 py-1'>
                <FaEdit />
              </Button>
            </Link>
            <form action={deleteFnW}>
            <Button
              type="submit"
              variant={'destructive'}
              className='group px-4 py-1 shadow-inner'
            >
              <IoTrashBin />
            </Button>
            </form>
          </div>
          <img
            src=''
            alt=''
            className='h-40 w-full overflow-hidden bg-blue-200'
          />
          <div className='mx-4 my-2 space-y-2'>
            <h4>{name}</h4>
            <p className='text-xs'>
              {description}
            </p>
          </div>
        </article>
    )
}