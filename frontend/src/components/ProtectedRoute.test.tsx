import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/test-utils';
import { ProtectedRoute } from './ProtectedRoute';

// Mock the API module
vi.mock('@/lib/api', () => ({
    isAuthenticated: vi.fn()
}));

// Mock Navigate component
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        Navigate: ({ to }: { to: string }) => {
            mockNavigate(to);
            return <div data-testid='navigate'>Redirecting to {to}</div>;
        }
    };
});

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders children when user is authenticated', async () => {
        const { isAuthenticated } = await import('@/lib/api');
        const mockIsAuthenticated = isAuthenticated as any;

        mockIsAuthenticated.mockReturnValue(true);

        render(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
    });

    it('redirects to login when user is not authenticated', async () => {
        const { isAuthenticated } = await import('@/lib/api');
        const mockIsAuthenticated = isAuthenticated as any;

        mockIsAuthenticated.mockReturnValue(false);

        render(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
        expect(screen.getByTestId('navigate')).toBeInTheDocument();
        expect(screen.getByText('Redirecting to /login')).toBeInTheDocument();
    });

    it('calls isAuthenticated function to check auth status', async () => {
        const { isAuthenticated } = await import('@/lib/api');
        const mockIsAuthenticated = isAuthenticated as any;

        mockIsAuthenticated.mockReturnValue(true);

        render(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        );

        expect(mockIsAuthenticated).toHaveBeenCalled();
    });

    it('handles complex children components', async () => {
        const { isAuthenticated } = await import('@/lib/api');
        const mockIsAuthenticated = isAuthenticated as any;

        mockIsAuthenticated.mockReturnValue(true);

        const ComplexChild = () => (
            <div>
                <h1>Dashboard</h1>
                <button>Action</button>
                <p>Some content</p>
            </div>
        );

        render(
            <ProtectedRoute>
                <ComplexChild />
            </ProtectedRoute>
        );

        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
        expect(screen.getByText('Some content')).toBeInTheDocument();
    });
});
