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
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      toast
        .promise(
          async () => {
            await signInWithEmailAndPassword(auth, data.email, data.password);
          },
          {
            loading: 'Logging in...',
            success: 'Logged in successfully',
            error: 'Error logging in',
          }
        )
        .then(() => {
          setIsLoading(false);
          router.push('/');
        });
    } catch (err) {
      toast.error('Error logging in');
      console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      toast
        .promise(
          async () => {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
          },
          {
            loading: 'Logging in...',
            success: 'Logged in successfully',
            error: 'Error logging in',
          }
        )
        .then(() => {
          setIsLoading(false);
          router.push('/');
        });
    } catch (err) {
      toast.error('Error logging in');
      console.log(err);
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
              <Input id='email' type='email' {...register('email')} placeholder='m@example.com' />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Button variant='outline' className='w-full mt-6' onClick={handleGoogleLogin} disabled={isLoading}>
            Login with Google
          </Button>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='underline underline-offset-4'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
