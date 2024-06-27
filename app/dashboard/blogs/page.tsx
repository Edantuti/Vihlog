import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CardBlog from '../../../components/cardBlog';
import { getWithBlogFn } from '@/app/actions/site/actions';
import { clearBlogs } from '@/app/actions/(temp)/clearCookiesBlog/actions';

export default async () => {
  const getSites = await getWithBlogFn();
  if (!getSites) {
    return (
      <>
        <div className='flex items-center justify-between'>
          <h1 className='my-4 text-xl font-medium'>Blogs</h1>
          <Link href='blogs/add'>
            <Button>+ New</Button>
          </Link>
        </div>
        <section className='space-y-2'>
          {/*TODO: Removing "any" from here */}
          <p>0 Sites</p>
        </section>
      </>
    );
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='my-4 text-xl font-medium'>Blogs</h1>
        {/*TODO: Remove this later */}
        <Link href='blogs/add'>
          <Button>+ New</Button>
        </Link>
      </div>
      <section className='space-y-2'>
        {/*TODO: Removing "any" from here */}
        {getSites.length > 0 &&
          getSites.map((data: any) => (
            <article
              key={`${data.id}`}
              className='px-2 py-5 hover:rounded hover:border'
            >
                <h3>{data.name}</h3>
                <p>{data.description}</p>
                <BlogSection blog={data.Blog} />
            </article>
          ))}
      </section>
    </>
  );
};

function BlogSection({blog}:{blog:{id:string, title:string, description:string}[]}){
  if(!blog){
    return <section>
      <p>No Blog for this site</p>
    </section>
  }
  return (
    <section>
      {blog.map(({id,title,description}:{id:string, title:string, description:string})=>(
        <CardBlog key={id} name={title} description={description} blogId={id} />
      ))}
    </section>
  )
}