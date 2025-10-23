import { http, HttpResponse } from 'msw';
import { mockAuthResponse } from './data/auth';
import { mockLoanApplication, mockApplicationSummary } from './data/loans';

const API_BASE_URL = '/api/v1';

export const handlers = [
    // Auth endpoints
    http.post(`${API_BASE_URL}/auth/login`, () => {
        return HttpResponse.json(mockAuthResponse);
    }),

    http.post(`${API_BASE_URL}/auth/register`, () => {
        return HttpResponse.json(mockAuthResponse);
    }),

    http.post(`${API_BASE_URL}/auth/refresh-tokens`, () => {
        return HttpResponse.json(mockAuthResponse);
    }),

    http.post(`${API_BASE_URL}/auth/logout`, () => {
        return new HttpResponse(null, { status: 200 });
    }),

    // Loan endpoints
    http.get(`${API_BASE_URL}/loans/user/:userId`, () => {
        return HttpResponse.json([mockLoanApplication]);
    }),

    http.get(`${API_BASE_URL}/loans/applications`, () => {
        return HttpResponse.json({
            applications: [mockLoanApplication],
            total: 1,
            page: 1,
            totalPages: 1
        });
    }),

    http.get(`${API_BASE_URL}/loans/applications/:id`, () => {
        return HttpResponse.json(mockLoanApplication);
    }),

    http.post(`${API_BASE_URL}/loans/applications`, () => {
        return HttpResponse.json(mockLoanApplication, { status: 201 });
    }),

    http.put(`${API_BASE_URL}/loans/applications/:id`, () => {
        return HttpResponse.json(mockLoanApplication);
    }),

    http.get(`${API_BASE_URL}/user/activity`, () => {
        return HttpResponse.json([]);
    }),

    http.get(`${API_BASE_URL}/admin/stats`, () => {
        return HttpResponse.json(mockApplicationSummary);
    }),

    // Document upload
    http.post(`${API_BASE_URL}/documents/upload`, () => {
        return HttpResponse.json({
            id: 'doc-new',
            fileName: 'uploaded_document.pdf',
            fileSize: 123456,
            documentType: 'ID_VERIFICATION',
            uploadedAt: new Date().toISOString(),
            url: 'https://example.com/documents/uploaded_document.pdf'
        });
    }),

    // Error handlers for testing error states
    http.post(`${API_BASE_URL}/auth/login-error`, () => {
        return new HttpResponse('Invalid credentials', { status: 401 });
    }),

    http.post(`${API_BASE_URL}/auth/register-error`, () => {
        return new HttpResponse('Email already exists', { status: 409 });
    }),

    http.get(`${API_BASE_URL}/loans/applications-error`, () => {
        return new HttpResponse('Server error', { status: 500 });
    })
];
