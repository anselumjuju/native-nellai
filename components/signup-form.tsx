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
import { useUser } from '@/context/UserContext';

const formSchema = z
  .object({
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
  const { user, setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { user: credential } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Signed up successfully');
      if (credential) {
        setUser({
          ...user,
          name: credential.displayName || '',
          email: credential.email || '',
          uid: credential.uid || '',
          phone: credential.phoneNumber || '',
          profilePic: credential.photoURL || '',
        });
      }
      reset();
      router.push('/setup');
    } catch (err) {
      toast.error('Error logging in');
      console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user: credential } = await signInWithPopup(auth, provider);
      if (credential) {
        setUser({
          ...user,
          name: credential.displayName || '',
          email: credential.email || '',
          uid: credential.uid || '',
          phone: credential.phoneNumber || '',
          profilePic: credential.photoURL || '',
        });
      }
      toast.success('Signed up successfully');
      router.push('/setup');
    } catch (err) {
      toast.error('Error logging in');
      console.log(err);
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
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' {...register('email')} placeholder='m@example.com' required />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' {...register('password')} required />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input id='confirm-password' type='password' {...register('confirmPassword')} required />
              {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
            </div>
            <Button type='submit' className='w-full'>
              Sign Up
            </Button>
            <Button variant='outline' className='w-full' onClick={handleGoogleLogin}>
              Sign Up with Google
            </Button>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link href='/login' className='underline underline-offset-4'>
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
