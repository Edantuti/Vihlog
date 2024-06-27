import { Flex, Grid, Box, Heading } from '@radix-ui/themes';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from "react-icons/fa";
import { redirect } from 'next/navigation';
import { getUser } from '@/utils/auth';
import { Button } from '@/components/ui/button';
export default async function Page() {
  const { user, session } = await getUser();
  if (session || user) {
    return redirect('/');
  }
  return (
    <>
      <Grid columns='2' gap='3' width='auto'>
        <Flex
          justify={'center'}
          align={'center'}
          className='h-screen bg-green-400'
        >
          <Flex
            width='20rem'
            height='30rem'
            direction={'column'}
            justify={'start'}
            align='center'
            className='bg-green-300'
          >
            <Heading as='h1'>Login</Heading>
            <form
              action={async () => {
                'use server';
                await redirect('/api/auth/google');
              }}
            >
              <Button className=''>
                <FaGoogle /> Login with Google
              </Button>
            </form>
            <form
              action={async () => {
                'use server';
                await redirect('/api/auth/github');
              }}
            >
              <Button className=''>
                <FaGithub /> Login with Github
              </Button>
            </form>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
}
