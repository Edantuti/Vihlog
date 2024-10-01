import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { deleteFn } from "@/app/actions/blog/actions";
import Image from "next/image";
import { FormButton } from "./FormButton";
//TODO: Shadcn has to be used here
export default function CardBlog({
  name,
  description,
  blogId,
}: {
  readonly name: string;
  readonly description: string;
  readonly blogId: string;
}) {
  const deleteFnW = deleteFn.bind(null, blogId);
  return (
    <Card className=" overflow-hidden">
      <Image src="" alt="" className="h-16 w-72 bg-blue-200" />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-2">
        <Link href={`blogs/${name}/edit`}>
          <Button variant={"secondary"}>
            <FaEdit className="aspect-square" />
          </Button>
        </Link>
        <form action={deleteFnW}>
          <FormButton
            type="submit"
            variant={"destructive"}
            className="group shadow-inner"
          >
            <IoTrashBin className="aspect-square" />
          </FormButton>
        </form>
      </CardFooter>
    </Card>
    // <article className="relative w-72 rounded border">
    //   <div className="absolute right-2 top-2 flex items-center gap-2">
    //     <Link href={`blogs/${name}/edit`}>
    //       <Button variant={"secondary"}>
    //         <FaEdit className="aspect-square"/>
    //       </Button>
    //     </Link>
    //     <form action={deleteFnW}>
    //       <FormButton
    //         type="submit"
    //         variant={"destructive"}
    //         className="group shadow-inner"
    //       >
    //         <IoTrashBin className="aspect-square" />
    //       </FormButton>
    //     </form>
    //   </div>
    //   <div className="mx-4 my-2 space-y-2">
    //     <h4>{name}</h4>
    //     <p className="text-xs">{description}</p>
    //   </div>
    // </article>
  );
}
