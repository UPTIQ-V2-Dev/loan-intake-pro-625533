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
import { register as registerUser } from '@/services/auth';

const registerSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const registerMutation = useMutation({
        mutationFn: (data: Omit<RegisterFormData, 'confirmPassword'>) => registerUser(data),
        onSuccess: () => {
            navigate('/dashboard');
        }
    });

    const onSubmit = (data: RegisterFormData) => {
        registerMutation.mutate({
            name: data.name,
            email: data.email,
            password: data.password
        });
    };

    return (
        <AuthLayout
            title='Create Account'
            description='Get started with your loan application'
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4'
            >
                {registerMutation.error && (
                    <Alert variant='destructive'>
                        <AlertDescription>
                            {registerMutation.error?.message || 'Registration failed. Please try again.'}
                        </AlertDescription>
                    </Alert>
                )}

                <div className='space-y-2'>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input
                        id='name'
                        type='text'
                        placeholder='Enter your full name'
                        {...register('name')}
                        disabled={registerMutation.isPending}
                    />
                    {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        {...register('email')}
                        disabled={registerMutation.isPending}
                    />
                    {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='password'>Password</Label>
                    <div className='relative'>
                        <Input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Create a password'
                            {...register('password')}
                            disabled={registerMutation.isPending}
                        />
                        <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1'
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={registerMutation.isPending}
                        >
                            {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                        </Button>
                    </div>
                    {errors.password && <p className='text-sm text-destructive'>{errors.password.message}</p>}
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <div className='relative'>
                        <Input
                            id='confirmPassword'
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm your password'
                            {...register('confirmPassword')}
                            disabled={registerMutation.isPending}
                        />
                        <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={registerMutation.isPending}
                        >
                            {showConfirmPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                        </Button>
                    </div>
                    {errors.confirmPassword && (
                        <p className='text-sm text-destructive'>{errors.confirmPassword.message}</p>
                    )}
                </div>

                <Button
                    type='submit'
                    className='w-full'
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    Create Account
                </Button>

                <div className='text-center text-sm'>
                    <span className='text-muted-foreground'>Already have an account? </span>
                    <Link
                        to='/login'
                        className='text-primary underline underline-offset-4 hover:text-primary/80'
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};
