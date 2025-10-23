import {
    LoanApplication,
    LoanApplicationData,
    ApplicationSummary,
    PersonalInfo,
    EmploymentInfo,
    FinancialInfo,
    LoanDocument
} from '@/types/loans';

export const mockPersonalInfo: PersonalInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-123-4567',
    dateOfBirth: '1990-05-15',
    ssn: '123-45-6789',
    address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
    }
};

export const mockEmploymentInfo: EmploymentInfo = {
    employmentStatus: 'EMPLOYED',
    employerName: 'Tech Corp Inc',
    jobTitle: 'Software Engineer',
    workPhone: '+1-555-987-6543',
    monthlyIncome: 8500,
    yearsOfEmployment: 3
};

export const mockFinancialInfo: FinancialInfo = {
    requestedAmount: 25000,
    loanPurpose: 'Home improvement',
    monthlyExpenses: 3500,
    existingDebts: 15000,
    bankAccountBalance: 45000,
    creditScore: 750
};

export const mockLoanDocument: LoanDocument = {
    id: 'doc-1',
    fileName: 'pay_stub.pdf',
    fileSize: 245760,
    documentType: 'INCOME_STATEMENT',
    uploadedAt: '2024-01-15T10:30:00.000Z',
    url: 'https://example.com/documents/pay_stub.pdf'
};

export const mockLoanApplicationData: LoanApplicationData = {
    personalInfo: mockPersonalInfo,
    employmentInfo: mockEmploymentInfo,
    financialInfo: mockFinancialInfo,
    documents: [mockLoanDocument],
    currentStep: 'REVIEW',
    loanType: 'PERSONAL'
};

export const mockLoanApplication: LoanApplication = {
    id: '1',
    userId: '1',
    status: 'SUBMITTED',
    loanType: 'PERSONAL',
    requestedAmount: 25000,
    submittedAt: '2024-01-15T14:00:00.000Z',
    updatedAt: '2024-01-15T14:00:00.000Z',
    createdAt: '2024-01-15T12:00:00.000Z',
    data: mockLoanApplicationData
};

export const mockApplicationSummary: ApplicationSummary = {
    totalApplications: 3,
    pendingReview: 1,
    approved: 1,
    rejected: 0,
    recentApplications: [mockLoanApplication]
};
