"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import {
  useEditor,
  EditorContent,
  Editor,
  ChainedCommands,
} from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { ToggleGroup } from "./ui/toggle-group";
import { ToggleGroupItem } from "./ui/toggle-group";
import { useParams } from "next/navigation";

import {
  FaBold,
  FaImage,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

const CustomDocument = Document.extend({
  content: "heading block*",
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.insertContent("\t");
      },
    };
  },
});

//TODO: Adding custom tag for adding description.
//TODO: Width fixing for the editor.
//TODO: Add Collabration feature.
//FIX: Add Context for getting the html data

export default function BlogEditor({
  onChange,
  content,
}: {
  onChange: Dispatch<SetStateAction<string>>;
  content: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const editor = useEditor({
    onBlur({ editor }) {
      onChange(editor.getHTML());
    },
    extensions: [
      Image,
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `What's the title?`;
          }
          return `Here you go!`;
        },
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-3 before:left-3 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
      Underline,
      Link,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose-sm md:prose lg:prose-lg xl:prose-4xl focus:outline-none px-3 py-5 rounded w-full",
      },
    },
  });
  interface StyleOperation {
    name: string;
    set: (chain: ChainedCommands) => ChainedCommands;
    unset: (chain: ChainedCommands) => ChainedCommands;
  }

  async function addImage(formData: FormData) {
    if (!formData.get("imgName")) {
      toast.error("Provide file name");
      return;
    }
    if (inputRef?.current?.files) {
      const file = inputRef?.current?.files[0];
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({
            image: reader.result!.toString(),
            name: formData.get("imgName")!.toString(),
            blogName: decodeURI(slug),
          }),
        });
        if (!response.ok) {
          return toast.error("Invalid details or file");
        }
        const res_data = await response.json();
        editor?.chain().focus().setImage({ src: res_data.url }).run();
      };
    }
  }
  function addHeading(type: string) {
    const edit = editor?.chain();
    if (type === "h2") {
      if (editor?.view.state.selection.empty) {
        edit?.createParagraphNear().toggleHeading({ level: 2 });
      } else {
        edit?.toggleHeading({ level: 2 });
      }
    }
    if (type === "h3") {
      if (editor?.view.state.selection.empty) {
        edit?.createParagraphNear().toggleHeading({ level: 3 });
      } else {
        edit?.toggleHeading({ level: 3 });
      }
    }
    edit?.run();
  }
  return (
    <section className="w-full mx-2">
      <ToggleGroup
        className="border w-fit px-2 py-1 rounded-t mx-auto"
        type="multiple"
        onValueChange={(value) => {
          if (!editor) return;

          const edit = editor.chain();

          const applyStyle = (
            styleIncluded: boolean,
            setStyle: (chain: ChainedCommands) => ChainedCommands,
            unsetStyle: (chain: ChainedCommands) => ChainedCommands,
          ): void => {
            if (styleIncluded) {
              if (editor.view.state.selection.empty) {
                edit.createParagraphNear();
              }
              setStyle(edit);
            } else {
              unsetStyle(edit);
            }
          };

          const styles: StyleOperation[] = [
            {
              name: "bold",
              set: (chain) => chain.setBold(),
              unset: (chain) => chain.unsetBold(),
            },
            {
              name: "italic",
              set: (chain) => chain.setItalic(),
              unset: (chain) => chain.unsetItalic(),
            },
            {
              name: "strike",
              set: (chain) => chain.setStrike(),
              unset: (chain) => chain.unsetStrike(),
            },
            {
              name: "underline",
              set: (chain) => chain.setUnderline(),
              unset: (chain) => chain.unsetUnderline(),
            },
          ];

          styles.forEach((style) => {
            applyStyle(value.includes(style.name), style.set, style.unset);
          });

          edit.run();
        }}
      >
        <Button variant="ghost" onClick={() => addHeading("h2")}>
          <p className="font-mono">H2</p>
        </Button>
        <Button variant="ghost" onClick={() => addHeading("h3")}>
          <p className="font-mono">H3</p>
        </Button>
        <Separator orientation="vertical" className="border h-4 border-black" />
        <ToggleGroupItem value="bold">
          <FaBold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <FaItalic />
        </ToggleGroupItem>
        <ToggleGroupItem value="strike">
          <FaStrikethrough />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <FaUnderline />
        </ToggleGroupItem>
        <Separator orientation="vertical" className="border h-4 border-black" />
        <Popover>
          <PopoverTrigger>
            <FaImage className="p-3 w-10 h-10 hover:bg-gray-300 active:bg-gray-300 rounded" />
          </PopoverTrigger>
          <PopoverContent>
            <Label htmlFor="image">Image</Label>
            <div className="flex gap-2">
              <form action={addImage} className="flex flex-col gap-2 ">
                <Input name="imgName" type="text" placeholder="image name" />
                <Input
                  ref={inputRef}
                  name="image"
                  type="file"
                  accept={`image/png, image/jpeg, image/webp`}
                />

                <Button> Submit</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </ToggleGroup>
      <EditorContent editor={editor}></EditorContent>
    </section>
  );
}
