import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

// Mock data for demonstration
const recentApplications = [
    {
        id: '1',
        type: 'Personal Loan',
        amount: '$25,000',
        status: 'under_review' as const,
        submittedAt: '2024-01-15'
    },
    {
        id: '2',
        type: 'Auto Loan',
        amount: '$35,000',
        status: 'approved' as const,
        submittedAt: '2024-01-10'
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'approved':
            return 'bg-green-100 text-green-800 hover:bg-green-100/80';
        case 'rejected':
            return 'bg-red-100 text-red-800 hover:bg-red-100/80';
        case 'under_review':
            return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80';
        default:
            return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'approved':
            return <CheckCircle className='h-4 w-4' />;
        case 'rejected':
            return <XCircle className='h-4 w-4' />;
        case 'under_review':
            return <Clock className='h-4 w-4' />;
        default:
            return <FileText className='h-4 w-4' />;
    }
};

export const DashboardPage = () => {
    return (
        <div className='p-6 space-y-6'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
                    <p className='text-muted-foreground'>Manage your loan applications and track their progress</p>
                </div>
                <Button asChild>
                    <Link to='/apply'>
                        <Plus className='mr-2 h-4 w-4' />
                        New Application
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Total Applications</CardTitle>
                        <FileText className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>2</div>
                        <p className='text-xs text-muted-foreground'>Active applications</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Under Review</CardTitle>
                        <Clock className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>1</div>
                        <p className='text-xs text-muted-foreground'>Pending review</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Approved</CardTitle>
                        <CheckCircle className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>1</div>
                        <p className='text-xs text-muted-foreground'>Successfully approved</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Total Amount</CardTitle>
                        <FileText className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>$60,000</div>
                        <p className='text-xs text-muted-foreground'>Requested amount</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Applications */}
            <Card>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Recent Applications</CardTitle>
                            <CardDescription>Your latest loan applications</CardDescription>
                        </div>
                        <Button
                            variant='outline'
                            asChild
                        >
                            <Link to='/applications'>View All</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='space-y-4'>
                        {recentApplications.map(application => (
                            <div
                                key={application.id}
                                className='flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors'
                            >
                                <div className='flex items-center gap-4'>
                                    <FileText className='h-8 w-8 text-muted-foreground' />
                                    <div>
                                        <div className='font-medium'>{application.type}</div>
                                        <div className='text-sm text-muted-foreground'>
                                            Submitted on {new Date(application.submittedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='text-right'>
                                        <div className='font-medium'>{application.amount}</div>
                                        <Badge className={getStatusColor(application.status)}>
                                            {getStatusIcon(application.status)}
                                            <span className='ml-1 capitalize'>
                                                {application.status.replace('_', ' ')}
                                            </span>
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks to get you started</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Button asChild>
                            <Link to='/apply'>
                                <Plus className='mr-2 h-4 w-4' />
                                Start New Application
                            </Link>
                        </Button>
                        <Button
                            variant='outline'
                            asChild
                        >
                            <Link to='/applications'>
                                <FileText className='mr-2 h-4 w-4' />
                                View All Applications
                            </Link>
                        </Button>
                        <Button
                            variant='outline'
                            asChild
                        >
                            <Link to='/profile'>Update Profile</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
