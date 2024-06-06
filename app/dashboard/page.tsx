import { Button } from '@/components/ui/button';

export default async () => {
  return (
    <>
      <h1 className='my-4 text-xl font-medium'>Dashboard</h1>
      <section className='space-y-5'>
        <div className='my-2 flex items-center justify-between'>
          <h2 className='text-lg font-medium'>Organisations</h2>
          <Button>New +</Button>
        </div>
        <section className='flex h-40 w-full items-center justify-center rounded border'>
          <p className='text-center text-base'>0 Organisations</p>
        </section>
        <div className='my-2 flex items-center justify-between'>
          <h2 className='text-lg font-medium'>Sites</h2>
          <Button>New +</Button>
        </div>
        <section className='flex h-40 w-full items-center justify-center rounded border'>
          <p className='text-center text-base'>0 sites</p>
        </section>
      </section>
    </>
  );
};
