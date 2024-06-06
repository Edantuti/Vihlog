import TipTap from '@/components/TipTap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Page() {
  return (
    <section className='flex gap-10'>
      <div className='flex min-h-96 w-72 flex-col justify-between border p-5'>
        <form className='flex flex-col gap-2'>
          <Label htmlFor='title'>Title:</Label>
          <Input
            id='title'
            type='text'
            placeholder='What should be the Title?'
            className=''
          />
          <Label htmlFor='description'>Description:</Label>
          <Textarea
            id='description'
            placeholder='what about description?'
            className='max-h-screen'
          />

          <Label htmlFor='picture'>Cover Photo:</Label>
          <Input
            id='picture'
            type='file'
            accept={`image/png, image/jpeg, image/webp`}
          />
          {/* <Input id="description" type="text" placeholder="What about description?" /> */}
        </form>
        <Button>Publish</Button>
      </div>
      <TipTap />
    </section>
  );
}
