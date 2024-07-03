"use client";
import { createFn } from "@/app/actions/site/actions";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/submitButton";
import { toast } from "sonner";
function Forms() {
  async function serverAction(formData: FormData) {
    const result = await createFn(formData);
    if (result && result.error) {
      return toast.error("Some Happend");
    }
    toast.success("Form Submitted.");
  }
  return (
    <form action={serverAction} className="flex w-96 flex-col gap-5">
      <Label htmlFor="name">Name:</Label>
      <Input name="name" title="name" placeholder="Name" type="text" required />
      <Label htmlFor="description">Description:</Label>
      <Textarea
        name="description"
        title="description"
        placeholder="Description"
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
