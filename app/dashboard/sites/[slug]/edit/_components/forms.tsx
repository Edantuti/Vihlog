"use client";
import { createFn } from "@/app/actions/site/actions";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submitButton";
import { toast } from "sonner";
import { editFn } from "@/app/actions/site/actions";

function Forms({
  site,
  params,
}: {
  readonly site: { name: string; description: string };
  readonly params: { slug: string };
}) {
  async function serverActions(formData: FormData) {
    const editFnWithId = editFn.bind(null, decodeURI(params.slug));
    const result = await editFnWithId(formData);
    if (result?.error) {
      return toast.error("Some Happend");
    }
    toast.success("Form Submitted.");
  }
  return (
    <form action={serverActions} className="flex w-96 flex-col gap-5">
      <Label htmlFor="name">Name:</Label>
      <Input
        name="name"
        title="name"
        placeholder="Name"
        type="text"
        defaultValue={site.name}
        required
      />
      <Label htmlFor="description">Description:</Label>
      <Textarea
        name="description"
        title="description"
        placeholder="Description"
        defaultValue={site.description}
        required
      />
      <span className="flex items-center gap-2">
        <Checkbox name="visible" title="visible" value="true" />
        <Label htmlFor="visible">Private?</Label>
      </span>
      <SubmitButton />
    </form>
  );
}

Forms.displayName = "Forms";

export { Forms };
