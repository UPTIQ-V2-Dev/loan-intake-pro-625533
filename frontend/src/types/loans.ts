export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'REQUIRES_INFO';

export type DocumentType =
    | 'ID_VERIFICATION'
    | 'INCOME_STATEMENT'
    | 'BANK_STATEMENT'
    | 'TAX_RETURN'
    | 'EMPLOYMENT_LETTER'
    | 'OTHER';

export type LoanType = 'PERSONAL' | 'AUTO' | 'MORTGAGE' | 'BUSINESS' | 'STUDENT';

export type ApplicationStep = 'PERSONAL_INFO' | 'EMPLOYMENT' | 'FINANCIAL' | 'DOCUMENTS' | 'REVIEW';

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    ssn: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
}

export interface EmploymentInfo {
    employmentStatus: 'EMPLOYED' | 'SELF_EMPLOYED' | 'UNEMPLOYED' | 'RETIRED';
    employerName?: string;
    jobTitle?: string;
    workPhone?: string;
    monthlyIncome: number;
    yearsOfEmployment?: number;
}

export interface FinancialInfo {
    requestedAmount: number;
    loanPurpose: string;
    monthlyExpenses: number;
    existingDebts: number;
    bankAccountBalance: number;
    creditScore?: number;
}

export interface LoanDocument {
    id: string;
    fileName: string;
    fileSize: number;
    documentType: DocumentType;
    uploadedAt: string;
    url?: string;
}

export interface LoanApplicationData {
    personalInfo: PersonalInfo;
    employmentInfo: EmploymentInfo;
    financialInfo: FinancialInfo;
    documents: LoanDocument[];
    currentStep: ApplicationStep;
    loanType: LoanType;
}

export interface LoanApplication {
    id: string;
    userId: string;
    status: ApplicationStatus;
    loanType: LoanType;
    requestedAmount: number;
    submittedAt?: string;
    updatedAt: string;
    createdAt: string;
    data: LoanApplicationData;
    notes?: ApplicationNote[];
}

export interface ApplicationNote {
    id: string;
    applicationId: string;
    authorId: string;
    authorName: string;
    content: string;
    isInternal: boolean;
    createdAt: string;
}

export interface CreateLoanApplicationRequest {
    loanType: LoanType;
    personalInfo: PersonalInfo;
    employmentInfo?: Partial<EmploymentInfo>;
    financialInfo?: Partial<FinancialInfo>;
}

export interface UpdateLoanApplicationRequest {
    personalInfo?: Partial<PersonalInfo>;
    employmentInfo?: Partial<EmploymentInfo>;
    financialInfo?: Partial<FinancialInfo>;
    currentStep?: ApplicationStep;
    status?: ApplicationStatus;
}

export interface GetApplicationsParams {
    status?: ApplicationStatus;
    loanType?: LoanType;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface ApplicationSummary {
    totalApplications: number;
    pendingReview: number;
    approved: number;
    rejected: number;
    recentApplications: LoanApplication[];
}
