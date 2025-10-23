import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/test/test-utils';
import { AuthLayout } from './AuthLayout';

describe('AuthLayout', () => {
    const defaultProps = {
        title: 'Test Title',
        description: 'Test Description',
        children: <div>Test Content</div>
    };

    it('renders with title, description, and children', () => {
        render(<AuthLayout {...defaultProps} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies correct styling classes for centering', () => {
        render(<AuthLayout {...defaultProps} />);

        const container = screen.getByText('Test Title').closest('.min-h-screen');
        expect(container).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
    });

    it('renders content within a card structure', () => {
        render(<AuthLayout {...defaultProps} />);

        // Check that the title is in a card header
        const title = screen.getByText('Test Title');
        expect(title.closest('.text-center')).toBeInTheDocument();

        // Check that content is in card content
        const content = screen.getByText('Test Content');
        expect(content).toBeInTheDocument();
    });

    it('handles long titles and descriptions properly', () => {
        const longProps = {
            title: 'This is a very long title that should still be displayed properly',
            description:
                'This is a very long description that explains what the user should do on this page and provides helpful context for the form',
            children: <div>Test Content</div>
        };

        render(<AuthLayout {...longProps} />);

        expect(screen.getByText(longProps.title)).toBeInTheDocument();
        expect(screen.getByText(longProps.description)).toBeInTheDocument();
    });

    it('renders different types of children correctly', () => {
        const complexChildren = (
            <div>
                <input
                    type='email'
                    placeholder='Email'
                />
                <button type='submit'>Submit</button>
                <p>Additional text</p>
            </div>
        );

        render(
            <AuthLayout
                title='Test'
                description='Test desc'
                children={complexChildren}
            />
        );

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByText('Additional text')).toBeInTheDocument();
    });
});
