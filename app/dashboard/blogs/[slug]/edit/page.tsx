import EditorConfiguration from "@/components/EditorConfiguration";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import { retrieveFn } from "@/app/actions/blog/actions";
import { getUser } from "@/utils/auth";
export default async function Page({ params }: { params: { slug: string } }) {
  const {user} = await getUser()
  if(!user) redirect('/login')
  const blog = await db.blog.findFirst({
    where: { title: decodeURI(params.slug), userId: user.id},
  });
  if (!blog) {
    redirect("/dashboard/blogs");
  }
  const blogContent = await retrieveFn(blog.id);
  if (!blogContent) {
    redirect("/dashboard/blogs");
  }
  return (
    <section className="flex justify-between w-full">
      <EditorConfiguration blogId={blog.id} blogContent={blogContent} />
    </section>
  );
}
