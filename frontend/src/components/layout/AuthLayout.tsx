import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-background px-4'>
            <div className='w-full max-w-md'>
                <Card>
                    <CardHeader className='text-center'>
                        <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>{children}</CardContent>
                </Card>
            </div>
        </div>
    );
};
