import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ComingSoonPage } from '@/pages/ComingSoonPage';
import { isAuthenticated } from '@/lib/api';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path='/login'
                        element={
                            isAuthenticated() ? (
                                <Navigate
                                    to='/dashboard'
                                    replace
                                />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                    <Route
                        path='/register'
                        element={
                            isAuthenticated() ? (
                                <Navigate
                                    to='/dashboard'
                                    replace
                                />
                            ) : (
                                <RegisterPage />
                            )
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path='/*'
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path='dashboard'
                            element={<DashboardPage />}
                        />
                        <Route
                            path='apply'
                            element={
                                <ComingSoonPage
                                    title='Loan Application'
                                    description="The loan application form is coming soon. You'll be able to apply for various types of loans with our easy-to-use multi-step form."
                                />
                            }
                        />
                        <Route
                            path='applications'
                            element={
                                <ComingSoonPage
                                    title='My Applications'
                                    description='View and manage all your loan applications in one place. Track their status and get updates on your progress.'
                                />
                            }
                        />
                        <Route
                            path='profile'
                            element={
                                <ComingSoonPage
                                    title='Profile'
                                    description='Manage your personal information, contact details, and account preferences.'
                                />
                            }
                        />
                        <Route
                            path='settings'
                            element={
                                <ComingSoonPage
                                    title='Settings'
                                    description='Configure your account settings, notifications, and privacy preferences.'
                                />
                            }
                        />
                    </Route>

                    {/* Default redirect */}
                    <Route
                        path='/'
                        element={
                            <Navigate
                                to={isAuthenticated() ? '/dashboard' : '/login'}
                                replace
                            />
                        }
                    />
                </Routes>
                <Toaster />
            </Router>
        </QueryClientProvider>
    );
};
