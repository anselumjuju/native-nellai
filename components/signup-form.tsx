'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import { useState } from 'react';

const formSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(10, 'Name must be at most 10 characters'),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      toast.promise(
        async () => {
          setIsLoading(true);
          const { user: credential } = await createUserWithEmailAndPassword(auth, data.email, data.password);
          if (credential) {
            const formData = new FormData();
            formData.append('uid', `${credential.uid}`);
            formData.append('name', `${data.name}`);
            formData.append('email', `${credential.email}`);
            await handleRequest({ endpoint: 'users', method: 'POST', data: formData });
            setUser({
              name: data.name,
              email: credential.email || '',
              role: 'user',
            });
          }
          router.push('/setup');
        },
        {
          loading: 'Signing up...',
          success: () => {
            toast.success('Logged in successfully');
            router.push('/setup');
          },
          error: 'Error logging in',
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      toast.promise(
        async () => {
          setIsLoading(true);
          const provider = new GoogleAuthProvider();
          const { user: credential } = await signInWithPopup(auth, provider);
          if (credential) {
            const formData = new FormData();
            formData.append('uid', `${credential.uid}`);
            formData.append('name', `${credential.displayName}`);
            formData.append('email', `${credential.email}`);
            formData.append('phone', `${credential.phoneNumber}`);
            formData.append('profilePic', `${credential.photoURL}`);
            await handleRequest({ endpoint: 'users', method: 'POST', data: formData });
            setUser({
              name: credential.displayName || '',
              email: credential.email || '',
              phone: credential.phoneNumber || '',
              profilePic: credential.photoURL || '',
              role: 'user',
            });
          }
        },
        {
          loading: 'Signing up...',
          success: () => {
            toast.success('Logged in successfully');
            router.push('/setup');
          },
          error: 'Error logging in',
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Signup</CardTitle>
          <CardDescription>Enter your details below to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' type='text' {...register('name')} placeholder='Jhon Doe' required />
              {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' {...register('email')} placeholder='jhondoe@example.com' required />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} placeholder='********' required />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input id='confirm-password' type='password' {...register('confirmPassword')} placeholder='********' required />
              {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
            </div>
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
          <Button variant='outline' className='w-full mt-6' onClick={handleGoogleLogin} disabled={isLoading}>
            Sign Up with Google
          </Button>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='underline underline-offset-4'>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
