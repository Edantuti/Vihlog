'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import { Node } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const CustomDocument = Document.extend({
  content: 'heading block*',
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.insertContent('\t');
      },
    };
  },
});

//TODO: Adding custom tag for adding description.
//TODO: Width fixing for the editor.

export default function Editor() {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `What's the title?`;
          }
          return `Here you go!`;
        },
        emptyEditorClass:
          'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-3 before:left-3 before:text-mauve-11 before:opacity-50 before-pointer-events-none',
      }),
    ],
    content: `<h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>`,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg focus:outline-none px-3 py-5 rounded',
      },
    },
  });
  return <EditorContent editor={editor}></EditorContent>;
}
