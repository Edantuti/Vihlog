"use client";
import { useState } from "react";
import TipTap from "@/components/TipTap";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { editFn } from "@/app/actions/blog/actions";
import { toast } from "sonner";
import SubmitButton from "./submitButton";


function EditorConfiguration({
  blogId,
  blogContent,
}: {
  blogId: string;
  blogContent: { data: { [key: string]: any }; content: string };
}) {
  const [data, setData] = useState<string>(blogContent.content);
  const editFnWithData = editFn.bind(null, blogId, data);
  async function serverActions(formData: FormData) {
    const result = await editFnWithData(formData);
    if (result && result.error) {
      return toast.error("Some Happend");
    }
    toast.success("Form Submitted.");
  }
  return (
    <>

      {/* TODO: Refactor required */}
      <TipTap onChange={setData} content={blogContent.content} />
      <form
        action={serverActions}
        className="flex min-h-screen w-96 flex-col space-y-2 p-5 rounded border-l"
      >
        <Label htmlFor="title" className="text-lg">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="What should be the Title?"
          className=""
          defaultValue={blogContent.data.title}
        />
        <Label htmlFor="description" className="text-lg">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="what about description?"
          className="max-h-screen"
          defaultValue={blogContent.data.description}
        />

        <Label htmlFor="picture" className="text-lg">Cover Photo</Label>
        <Input
          id="picture"
          name="picture"
          type="file"
          accept={`image/png, image/jpeg, image/webp`}
        />
        <SubmitButton>Publish</SubmitButton>
      </form>
    </>
  );
}
EditorConfiguration.displayName = "EditorConfiguration";
export default EditorConfiguration;
