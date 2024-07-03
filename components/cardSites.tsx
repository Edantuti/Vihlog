import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { MdPublish } from "react-icons/md";
import { deleteFn, deploy } from "@/app/actions/site/actions";
import { FormButton } from "./FormButton";
export default function CardSite({
  name,
  id,
  description,
  fullname,
}: {
  name: string;
  id: string;
  description: string;
  fullname: string;
}) {
  const deleteFnW = deleteFn.bind(null, id);
  const deployWithId = deploy.bind(null, id);
  return (
    <article className="relative w-72 rounded border">
      <div className="absolute right-2 top-2 flex items-center gap-2">
        <form action={deployWithId}>
          <FormButton className="group outline outline-1 w-10 h-10 p-1">
            <MdPublish />
          </FormButton>
        </form>
        <Link href={`dashboard/sites/${name}/edit`}>
          <FormButton variant={"secondary"} className=" w-10 h-10 p-1">
            <FaEdit />
          </FormButton>
        </Link>
        <form action={deleteFnW}>
          <FormButton
            type="submit"
            variant={"destructive"}
            className="group shadow-inner w-10 h-10 p-1"
          >
            <IoTrashBin />
          </FormButton>
        </form>
      </div>
      <Image
        src=""
        alt=""
        className="h-32 w-full overflow-hidden bg-blue-200"
      />
      <div className="p-2">
        <h3 className="text-base">{name}</h3>
        <p className="text-xs">{description}</p>
      </div>
    </article>
  );
}
