"use client";
import { createFn } from "@/app/actions/blog/actions";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submitButton";
import * as CN from "@/components/ui/select";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
function Forms({
  sites,
}: {
  readonly sites: { id: string; fullName: string; name: string }[];
}) {
  async function serverAction(formData: FormData) {
    const result = await createFn(formData);

    if (result?.error) {
      return toast.error("Some Happend");
    }
    toast.success("Form Submitted.");
  }
  return (
    <form action={serverAction} className="flex w-96 flex-col gap-5 mx-auto">
      <Label htmlFor="name">Name:</Label>
      <Input name="name" title="name" placeholder="Name" type="text" required />
      <Label htmlFor="description">Description:</Label>
      <Textarea name="description" placeholder="Description" required />
      <CN.Select name="site" required>
        <CN.SelectTrigger>
          <CN.SelectValue placeholder="Choose the sites" />
        </CN.SelectTrigger>
        <CN.SelectContent>
          {sites?.map(
            (data: { id: string; name: string; fullName: string }) => (
              <CN.SelectItem
                key={data.id}
                value={JSON.stringify({
                  id: data.id,
                  fullName: data.fullName,
                })}
              >
                {data.name}
              </CN.SelectItem>
            ),
          )}
        </CN.SelectContent>
      </CN.Select>
      <SubmitButton />
    </form>
  );
}

Forms.displayName = "Forms";

export { Forms };
