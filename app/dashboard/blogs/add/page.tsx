import { createFn } from '@/app/actions/blog/actions';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/submitButton';
import * as CN from '@/components/ui/select';
import { getFn } from '@/app/actions/site/actions';

//TODO:Rework required
export default async () => {
  const sites = await getFn();
  return (
    <section className=''>
      <form action={createFn} className='flex w-96 flex-col gap-5'>
        <Label htmlFor='name'>Name:</Label>
        <Input
          name='name'
          title='name'
          placeholder='Name'
          type='text'
          required
        />
        <Label htmlFor='description'>Description:</Label>
        <Textarea name='description' placeholder='Description' required />
        <CN.Select name="site">
          <CN.SelectTrigger>
            <CN.SelectValue placeholder='Choose the sites' />
          </CN.SelectTrigger>
          <CN.SelectContent>
            {sites &&
              sites.map((data: { id: string; name: string, fullName:string }) => (
                <CN.SelectItem key={data.id} value={JSON.stringify({id:data.id, fullName:data.fullName})}>
                  {data.name}
                </CN.SelectItem>
              ))}
          </CN.SelectContent>
        </CN.Select>
        <span className='flex items-center gap-2'>
          <Checkbox name='visible' title='visible' />
          <Label htmlFor='visible'>Private?</Label>
        </span>
        <SubmitButton />
      </form>
    </section>
  );
};
