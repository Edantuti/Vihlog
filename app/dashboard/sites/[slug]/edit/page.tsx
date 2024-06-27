import { editFn } from '@/app/actions/site/actions';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/submitButton';
import { db } from '@/utils/db';
import { redirect } from 'next/navigation';
export default async function Page({ params }: { params: { slug: string } }) {
  const site = await db.sites.findFirst({where:{name:decodeURI(params.slug)}})
  const editFnWithId = editFn.bind(null, decodeURI(params.slug));
  if(!site){
    redirect('/dashboard/sites/add')
  }
  return (
    <form action={editFnWithId} className='flex w-96 flex-col gap-5'>
      <Label htmlFor='name'>Name:</Label>
      <Input name='name' title='name' placeholder='Name' type='text' defaultValue={site.name} required />
      <Label htmlFor='description'>Description:</Label>
      <Textarea
        name='description'
        title='description'
        placeholder='Description'
        defaultValue={site.description}
        required
      />
      <span className='flex items-center gap-2'>
        <Checkbox name='visible' title='visible' value='true' />
        <Label htmlFor='visible'>Private?</Label>
      </span>
      <SubmitButton />
    </form>
  );
}
