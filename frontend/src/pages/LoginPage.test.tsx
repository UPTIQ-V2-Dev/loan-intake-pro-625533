import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import { LoginPage } from './LoginPage';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('LoginPage', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        // Clear localStorage
        localStorage.clear();
    });

    it('renders login form with all required fields', () => {
        render(<LoginPage />);

        expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    });

    it('shows validation errors for invalid inputs', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        // Try to submit with empty fields
        await user.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for invalid email format', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        await user.type(screen.getByLabelText(/email/i), 'invalid-email');
        await user.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        });
    });

    it('toggles password visibility when eye icon is clicked', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        const passwordInput = screen.getByLabelText(/password/i);
        const toggleButton = screen.getByRole('button', { name: '' });

        // Initially password should be hidden
        expect(passwordInput).toHaveAttribute('type', 'password');

        // Click toggle to show password
        await user.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');

        // Click toggle to hide password again
        await user.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('submits form with valid credentials and navigates to dashboard', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        // Fill in the form
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByLabelText(/password/i), 'password123');

        // Submit the form
        await user.click(screen.getByRole('button', { name: /sign in/i }));

        // Wait for navigation
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('disables form fields and shows loading state during submission', async () => {
        const user = userEvent.setup();
        render(<LoginPage />);

        // Fill in the form
        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByLabelText(/password/i), 'password123');

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        await user.click(submitButton);

        // Check loading state (briefly)
        expect(screen.getByLabelText(/email/i)).toBeDisabled();
        expect(screen.getByLabelText(/password/i)).toBeDisabled();
    });

    it('has correct link to registration page', () => {
        render(<LoginPage />);

        const signUpLink = screen.getByRole('link', { name: /sign up/i });
        expect(signUpLink).toHaveAttribute('href', '/register');
    });
});
