'use client';
import { useState, useEffect } from 'react';
import TipTap from '@/components/TipTap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EditorProvider, useEditor } from '@tiptap/react';
import { editFn } from '@/app/actions/blog/actions';
import { useFormStatus } from 'react-dom';
import SubmitButton from './submitButton';
export default ({blogId, blogContent}:{blogId:string, blogContent:{data:{[key:string]:any}, content:string}}) => {
  const [data, setData] = useState<string>(blogContent.content);
  const editFnWithData = editFn.bind(null,blogId,data);
  return (
    <>
      <form
        action={editFnWithData}
        className='flex min-h-96 w-72 flex-col justify-between border p-5 rounded'
      >
        <Label htmlFor='title'>Title:</Label>
        <Input
          id='title'
          name='title'
          type='text'
          placeholder='What should be the Title?'
          className=''
          defaultValue={blogContent.data.title}
        />
        <Label htmlFor='description'>Description:(currently not implemented)</Label>
        <Textarea
          id='description'
          name='description'
          placeholder='what about description?'
          className='max-h-screen'
          defaultValue={blogContent.data.description}
        />

        <Label htmlFor='picture'>Cover Photo:(currently not implemented)</Label>
        <Input
          id='picture'
          name='picture'
          type='file'
          accept={`image/png, image/jpeg, image/webp`}
        />
        <SubmitButton>Publish</SubmitButton>
      </form>

      {/* TODO: Refactor required */}
      <TipTap onChange={setData} content={blogContent.content} />
    </>
  );
};
