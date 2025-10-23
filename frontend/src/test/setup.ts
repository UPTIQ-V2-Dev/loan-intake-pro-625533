import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll } from 'vitest';
import { server } from './mocks/server';

// Setup MSW server
beforeAll(() => {
    server.listen();
});

afterEach(() => {
    // Reset handlers after each test
    server.resetHandlers();
    cleanup();
});

afterAll(() => {
    server.close();
});
