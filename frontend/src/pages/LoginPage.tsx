import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { login } from '@/services/auth';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate('/dashboard');
        }
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <AuthLayout
            title='Welcome Back'
            description='Sign in to your loan application account'
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4'
            >
                {loginMutation.error && (
                    <Alert variant='destructive'>
                        <AlertDescription>
                            {loginMutation.error?.message || 'Login failed. Please try again.'}
                        </AlertDescription>
                    </Alert>
                )}

                <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        {...register('email')}
                        disabled={loginMutation.isPending}
                    />
                    {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='password'>Password</Label>
                    <div className='relative'>
                        <Input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
                            {...register('password')}
                            disabled={loginMutation.isPending}
                        />
                        <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1'
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={loginMutation.isPending}
                        >
                            {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                        </Button>
                    </div>
                    {errors.password && <p className='text-sm text-destructive'>{errors.password.message}</p>}
                </div>

                <Button
                    type='submit'
                    className='w-full'
                    disabled={loginMutation.isPending}
                >
                    {loginMutation.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    Sign In
                </Button>

                <div className='text-center text-sm'>
                    <span className='text-muted-foreground'>Don't have an account? </span>
                    <Link
                        to='/register'
                        className='text-primary underline underline-offset-4 hover:text-primary/80'
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};
