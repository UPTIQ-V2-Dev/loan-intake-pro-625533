import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/api';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authenticated = isAuthenticated();

    if (!authenticated) {
        return (
            <Navigate
                to='/login'
                replace
            />
        );
    }

    return <>{children}</>;
};
