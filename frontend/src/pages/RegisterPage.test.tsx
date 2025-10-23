import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test/test-utils';
import { RegisterPage } from './RegisterPage';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('RegisterPage', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        localStorage.clear();
    });

    it('renders registration form with all required fields', () => {
        render(<RegisterPage />);

        expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
        expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        const user = userEvent.setup();
        render(<RegisterPage />);

        await user.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
            expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
        });
    });

    it('shows error when passwords do not match', async () => {
        const user = userEvent.setup();
        render(<RegisterPage />);

        await user.type(screen.getByLabelText(/full name/i), 'John Doe');
        await user.type(screen.getByLabelText(/email/i), 'john@example.com');
        await user.type(screen.getByLabelText(/^password$/i), 'password123');
        await user.type(screen.getByLabelText(/confirm password/i), 'different_password');

        await user.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
        });
    });

    it('toggles password visibility for both password fields', async () => {
        const user = userEvent.setup();
        render(<RegisterPage />);

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        const toggleButtons = screen.getAllByRole('button', { name: '' });

        // Initially both passwords should be hidden
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');

        // Click first toggle to show password
        await user.click(toggleButtons[0]);
        expect(passwordInput).toHaveAttribute('type', 'text');

        // Click second toggle to show confirm password
        await user.click(toggleButtons[1]);
        expect(confirmPasswordInput).toHaveAttribute('type', 'text');
    });

    it('validates minimum password length', async () => {
        const user = userEvent.setup();
        render(<RegisterPage />);

        await user.type(screen.getByLabelText(/^password$/i), 'short');
        await user.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
        });
    });

    it('validates name minimum length', async () => {
        const user = userEvent.setup();
        render(<RegisterPage />);

        await user.type(screen.getByLabelText(/full name/i), 'A');
        await user.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
        });
    });

    it('submits form with valid data and navigates to dashboard', async () => {
        const user = userEvent.setup();
        render(<RegisterPage />);

        // Fill in the form with valid data
        await user.type(screen.getByLabelText(/full name/i), 'John Doe');
        await user.type(screen.getByLabelText(/email/i), 'john@example.com');
        await user.type(screen.getByLabelText(/^password$/i), 'password123');
        await user.type(screen.getByLabelText(/confirm password/i), 'password123');

        // Submit the form
        await user.click(screen.getByRole('button', { name: /create account/i }));

        // Wait for navigation
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('has correct link to login page', () => {
        render(<RegisterPage />);

        const signInLink = screen.getByRole('link', { name: /sign in/i });
        expect(signInLink).toHaveAttribute('href', '/login');
    });
});
