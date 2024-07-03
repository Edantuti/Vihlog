"use client";
import { Dispatch, SetStateAction, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { ToggleGroup } from "./ui/toggle-group";
import { ToggleGroupItem } from "./ui/toggle-group";

import {
  FaBold,
  FaImage,
  FaItalic,
  FaLink,
  FaPlus,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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

export default function Editor({
  onChange,
  content,
}: {
  onChange: Dispatch<SetStateAction<string>>;
  content: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    onBlur({ editor }) {
      onChange(editor.getHTML());
    },
    extensions: [
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
  function addImage() {
    if(inputRef?.current?.files){
      const file = inputRef?.current?.files[0]
      console.log(URL.createObjectURL(file))
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
          const edit = editor?.chain();
          if (value.includes("bold")) {
            if (editor?.view.state.selection.empty) {
              edit?.createParagraphNear().setBold();
            } else {
              edit?.setBold();
            }
          } else {
            edit?.unsetBold();
          }
          if (value.includes("italic")) {
            if (editor?.view.state.selection.empty) {
              edit?.createParagraphNear().setItalic();
            } else {
              edit?.setItalic();
            }
          } else {
            edit?.unsetItalic();
          }
          if (value.includes("strike")) {
            if (editor?.view.state.selection.empty) {
              edit?.createParagraphNear().setStrike();
            } else {
              edit?.setStrike();
            }
          } else {
            edit?.unsetStrike();
          }
          if (value.includes("underline")) {
            if (editor?.view.state.selection.empty) {
              edit?.createParagraphNear().setUnderline();
            } else {
              edit?.setUnderline();
            }
          } else {
            edit?.unsetUnderline();
          }
          edit?.run();
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
              <FaImage className="p-3 w-10 h-10 hover:bg-gray-300 active:bg-gray-300 rounded"/>
          </PopoverTrigger>
          <PopoverContent>
            <Label htmlFor="image">Image</Label>
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                name="image"
                type="file"
                accept={`image/png, image/jpeg, image/webp`}
              />
              <p>Not Available</p>
            </div>
          </PopoverContent>
        </Popover>
      </ToggleGroup>
      <EditorContent editor={editor}></EditorContent>
    </section>
  );
}
