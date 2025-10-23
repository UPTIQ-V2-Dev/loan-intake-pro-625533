import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

interface ComingSoonPageProps {
    title: string;
    description: string;
}

export const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] p-6'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center'>
                    <div className='mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center'>
                        <Construction className='h-6 w-6 text-muted-foreground' />
                    </div>
                    <CardTitle className='text-xl'>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                    <Button asChild>
                        <Link to='/dashboard'>
                            <ArrowLeft className='mr-2 h-4 w-4' />
                            Back to Dashboard
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};
