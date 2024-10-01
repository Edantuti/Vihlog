import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { MdPublish } from "react-icons/md";
import { deleteFn, deploy } from "@/app/actions/site/actions";
import { FormButton } from "./FormButton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./ui/card";
export default function CardSite({
  name,
  id,
  deployed,
  description,
  fullname,
}: {
  readonly name: string;
  readonly id: string;
  readonly deployed: boolean;
  readonly description: string;
  readonly fullname: string;
}) {
  const deleteFnW = deleteFn.bind(null, id);
  const deployWithId = deploy.bind(null, id);
  return (
    <Card className="min-w-72">
      <CardHeader className="relative">
        <CardTitle className="text-xl">
          {name}{" "}
          {deployed ? (
            <Badge className="bg-green-500 absolute top-8 right-4 hover:bg-green-500">
              Deployed
            </Badge>
          ) : (
            <Badge className="bg-yellow-500 absolute top-8 right-4 hover:bg-yellow-500">
              Deploying
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-sm text-neutral-700">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <form action={deployWithId}>
            <FormButton
              className="group outline outline-1 w-10 h-10 p-1"
              disabled={!deployed}
            >
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
      </CardFooter>
    </Card>
  );
}
