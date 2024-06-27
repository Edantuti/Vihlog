import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaEdit } from 'react-icons/fa';
import { IoTrashBin } from 'react-icons/io5';
import { MdPublish } from "react-icons/md";
import { deleteFn, deploy } from '@/app/actions/site/actions';
export default ({name, id,description, fullname}:{name:string, id:string, description:string,fullname:string})=>{
    const deleteFnW = deleteFn.bind(null,id);
    const deployWithId = deploy.bind(null,id);
    return (
        <article className='relative w-96 rounded border'>
          <div className='absolute right-2 top-2 flex items-center gap-2'>
            <form action={deployWithId}>
              <Button className="group px-4 py-1 outline outline-1">
              <MdPublish />
              </Button>
            </form>
            <Link href={`dashboard/sites/${name}/edit`}>
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
          <div>
            <h3 className="text-lg">{name}</h3>
            <p className="">{description}</p>
          </div>
        </article>
    )
}