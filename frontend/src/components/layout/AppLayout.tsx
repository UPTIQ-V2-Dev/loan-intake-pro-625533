import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarHeader,
    SidebarTrigger
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileText, User, LogOut, PlusCircle, Settings } from 'lucide-react';
import { clearAuthData } from '@/lib/api';

export const AppLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuthData();
        navigate('/login');
    };

    return (
        <SidebarProvider>
            <div className='flex min-h-screen w-full'>
                <Sidebar>
                    <SidebarHeader className='border-b px-6 py-4'>
                        <div className='flex items-center gap-2'>
                            <FileText className='h-6 w-6' />
                            <span className='font-semibold text-lg'>LoanApp</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Main</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/dashboard'>
                                                <LayoutDashboard className='mr-2 h-4 w-4' />
                                                Dashboard
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/apply'>
                                                <PlusCircle className='mr-2 h-4 w-4' />
                                                Apply for Loan
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/applications'>
                                                <FileText className='mr-2 h-4 w-4' />
                                                My Applications
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Account</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/profile'>
                                                <User className='mr-2 h-4 w-4' />
                                                Profile
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link to='/settings'>
                                                <Settings className='mr-2 h-4 w-4' />
                                                Settings
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={handleLogout}>
                                            <LogOut className='mr-2 h-4 w-4' />
                                            Logout
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <div className='flex-1 flex flex-col'>
                    <header className='border-b bg-background'>
                        <div className='flex h-16 items-center px-6'>
                            <SidebarTrigger />
                        </div>
                    </header>
                    <main className='flex-1 overflow-auto'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};
