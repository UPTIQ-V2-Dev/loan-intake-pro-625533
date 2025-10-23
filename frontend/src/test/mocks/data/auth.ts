import { AuthResponse, User, LoginRequest, SignupRequest } from '@/types/user';

export const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'USER',
    isEmailVerified: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
};

export const mockAdmin: User = {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
};

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: '2024-12-31T23:59:59.000Z'
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: '2024-12-31T23:59:59.000Z'
        }
    }
};

export const mockLoginRequest: LoginRequest = {
    email: 'test@example.com',
    password: 'password123'
};

export const mockSignupRequest: SignupRequest = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
};
