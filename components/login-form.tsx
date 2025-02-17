'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Signed up successfully');
      router.push('/');
    } catch (err) {
      toast.error('Error logging in');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Signed up successfully');
      router.push('/');
    } catch (err) {
      toast.error('Error logging in');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' {...register('email')} placeholder='m@example.com' required />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} required />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <Button type='submit' className='w-full'>
              Login
            </Button>
            <Button variant='outline' className='w-full' onClick={handleGoogleLogin}>
              Login with Google
            </Button>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/signup' className='underline underline-offset-4'>
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
