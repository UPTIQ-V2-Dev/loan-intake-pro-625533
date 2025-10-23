import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login, register, logout } from './auth';
import { mockAuthResponse } from '@/data/mockData';

const mockLoginRequest = {
    email: 'test@example.com',
    password: 'password123'
};

const mockSignupRequest = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
};

// Mock the API module
vi.mock('@/lib/api', () => ({
    api: {
        post: vi.fn()
    },
    setAuthData: vi.fn(),
    clearAuthData: vi.fn(),
    getStoredRefreshToken: vi.fn()
}));

describe('Auth Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Set mock mode
        import.meta.env.VITE_USE_MOCK_DATA = 'true';
    });

    describe('login', () => {
        it('returns auth response for valid credentials in mock mode', async () => {
            const result = await login(mockLoginRequest);

            expect(result).toEqual(mockAuthResponse);
        });

        it('calls setAuthData when login is successful in mock mode', async () => {
            const { setAuthData } = await import('@/lib/api');

            await login(mockLoginRequest);

            expect(setAuthData).toHaveBeenCalledWith(mockAuthResponse);
        });
    });

    describe('register', () => {
        it('returns auth response for valid registration data in mock mode', async () => {
            const result = await register(mockSignupRequest);

            expect(result).toEqual(mockAuthResponse);
        });

        it('calls setAuthData when registration is successful in mock mode', async () => {
            const { setAuthData } = await import('@/lib/api');

            await register(mockSignupRequest);

            expect(setAuthData).toHaveBeenCalledWith(mockAuthResponse);
        });
    });

    describe('logout', () => {
        it('calls clearAuthData when logout is successful in mock mode', async () => {
            const { clearAuthData } = await import('@/lib/api');

            await logout();

            expect(clearAuthData).toHaveBeenCalled();
        });
    });

    describe('API mode', () => {
        beforeEach(() => {
            import.meta.env.VITE_USE_MOCK_DATA = 'false';
        });

        it('makes API call for login when not in mock mode', async () => {
            const { api, setAuthData } = await import('@/lib/api');
            const mockApi = api as any;

            mockApi.post.mockResolvedValue({ data: mockAuthResponse });

            const result = await login(mockLoginRequest);

            expect(mockApi.post).toHaveBeenCalledWith('/auth/login', mockLoginRequest);
            expect(setAuthData).toHaveBeenCalledWith(mockAuthResponse);
            expect(result).toEqual(mockAuthResponse);
        });

        it('makes API call for register when not in mock mode', async () => {
            const { api, setAuthData } = await import('@/lib/api');
            const mockApi = api as any;

            mockApi.post.mockResolvedValue({ data: mockAuthResponse });

            const result = await register(mockSignupRequest);

            expect(mockApi.post).toHaveBeenCalledWith('/auth/register', mockSignupRequest);
            expect(setAuthData).toHaveBeenCalledWith(mockAuthResponse);
            expect(result).toEqual(mockAuthResponse);
        });

        it('makes API call for logout when not in mock mode', async () => {
            const { api, getStoredRefreshToken, clearAuthData } = await import('@/lib/api');
            const mockApi = api as any;
            const mockGetStoredRefreshToken = getStoredRefreshToken as any;

            const mockRefreshToken = 'mock-refresh-token';
            mockGetStoredRefreshToken.mockReturnValue(mockRefreshToken);
            mockApi.post.mockResolvedValue({});

            await logout();

            expect(mockApi.post).toHaveBeenCalledWith('/auth/logout', {
                refreshToken: mockRefreshToken
            });
            expect(clearAuthData).toHaveBeenCalled();
        });

        it('throws error when logout is called without refresh token', async () => {
            const { getStoredRefreshToken } = await import('@/lib/api');
            const mockGetStoredRefreshToken = getStoredRefreshToken as any;

            mockGetStoredRefreshToken.mockReturnValue(null);

            await expect(logout()).rejects.toThrow('No refresh token found');
        });
    });
});
