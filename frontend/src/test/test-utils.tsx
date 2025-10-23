import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a test query client with minimal configuration
const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false
            }
        }
    });

interface ProvidersWrapperProps {
    children: React.ReactNode;
    queryClient?: QueryClient;
}

const ProvidersWrapper = ({ children, queryClient }: ProvidersWrapperProps) => {
    const testQueryClient = queryClient || createTestQueryClient();

    return (
        <QueryClientProvider client={testQueryClient}>
            <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
    );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    queryClient?: QueryClient;
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
    const { queryClient, ...renderOptions } = options || {};

    return render(ui, {
        wrapper: ({ children }) => <ProvidersWrapper queryClient={queryClient}>{children}</ProvidersWrapper>,
        ...renderOptions
    });
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Export utility functions
export { createTestQueryClient, ProvidersWrapper };
