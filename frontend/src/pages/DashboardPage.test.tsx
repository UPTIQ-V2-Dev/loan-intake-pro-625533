import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/test-utils';
import { DashboardPage } from './DashboardPage';

describe('DashboardPage', () => {
    it('renders dashboard header with title and description', () => {
        render(<DashboardPage />);

        expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
        expect(screen.getByText(/manage your loan applications and track their progress/i)).toBeInTheDocument();
    });

    it('renders new application button', () => {
        render(<DashboardPage />);

        const newAppButton = screen.getByRole('link', { name: /new application/i });
        expect(newAppButton).toBeInTheDocument();
        expect(newAppButton).toHaveAttribute('href', '/apply');
    });

    it('renders stats cards with correct information', () => {
        render(<DashboardPage />);

        // Check stats cards
        expect(screen.getByText(/total applications/i)).toBeInTheDocument();
        expect(screen.getByText(/under review/i)).toBeInTheDocument();
        expect(screen.getByText(/approved/i)).toBeInTheDocument();
        expect(screen.getByText(/total amount/i)).toBeInTheDocument();

        // Check stats values
        expect(screen.getByText('2')).toBeInTheDocument(); // Total applications
        expect(screen.getByText('1')).toBeInTheDocument(); // Under review
        expect(screen.getByText('$60,000')).toBeInTheDocument(); // Total amount
    });

    it('renders recent applications section', () => {
        render(<DashboardPage />);

        expect(screen.getByText(/recent applications/i)).toBeInTheDocument();
        expect(screen.getByText(/your latest loan applications/i)).toBeInTheDocument();

        // Check for mock application data
        expect(screen.getByText(/personal loan/i)).toBeInTheDocument();
        expect(screen.getByText(/auto loan/i)).toBeInTheDocument();
        expect(screen.getByText('$25,000')).toBeInTheDocument();
        expect(screen.getByText('$35,000')).toBeInTheDocument();
    });

    it('renders application status badges with correct styling', () => {
        render(<DashboardPage />);

        const underReviewBadge = screen.getByText(/under review/i);
        const approvedBadge = screen.getByText(/approved/i);

        expect(underReviewBadge).toBeInTheDocument();
        expect(approvedBadge).toBeInTheDocument();

        // Check that badges have appropriate classes
        expect(underReviewBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
        expect(approvedBadge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('renders quick actions section with correct links', () => {
        render(<DashboardPage />);

        expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
        expect(screen.getByText(/common tasks to get you started/i)).toBeInTheDocument();

        // Check action buttons
        const startNewAppButton = screen.getByRole('link', { name: /start new application/i });
        const viewAllButton = screen.getByRole('link', { name: /view all applications/i });
        const updateProfileButton = screen.getByRole('link', { name: /update profile/i });

        expect(startNewAppButton).toHaveAttribute('href', '/apply');
        expect(viewAllButton).toHaveAttribute('href', '/applications');
        expect(updateProfileButton).toHaveAttribute('href', '/profile');
    });

    it('renders view all applications button in recent applications section', () => {
        render(<DashboardPage />);

        const viewAllButton = screen.getAllByRole('link', { name: /view all/i })[0];
        expect(viewAllButton).toBeInTheDocument();
        expect(viewAllButton).toHaveAttribute('href', '/applications');
    });

    it('displays formatted submission dates', () => {
        render(<DashboardPage />);

        // Check that dates are formatted and displayed
        expect(screen.getByText(/submitted on 1\/15\/2024/i)).toBeInTheDocument();
        expect(screen.getByText(/submitted on 1\/10\/2024/i)).toBeInTheDocument();
    });
});
