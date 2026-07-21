/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../../app';
import AppError from '../../../../error/AppError';
import { decrypt } from '../../../../utils/encryption';
import { safeUserSelect } from '../../../../utils/prisma/selects';
import { LoanStatus } from '../../../applicationForm/application.interface';
import sendEmail from '../../../../utils/sendEmail';
import { applicationRejected } from '../../../../utils/email-template/applicationRejected';
import { loanStatusEmail } from '../../../../utils/email-template/loanStatusEmail';
import { TModules } from '../dashboard/dashboard.constand';

type TLoanStatus =
  | 'SUBMITTED'
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'ALL';

type TApplicationQuery = {
  searchTerm?: string;
  module?: TModules;
  status?: TLoanStatus;
  page?: number;
  limit?: number;
};

const getAllApplication = async (query: TApplicationQuery) => {
  const { searchTerm = '', module, status, page = 1, limit = 10 } = query;

  const skip = (page - 1) * limit;

  const whereCondition: any = {};

  // ============================
  // 🔍 Search Filter
  // ============================
  if (searchTerm) {
    whereCondition.OR = [
      {
        user: {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
      {
        applicationId: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      {
        eligibleLoanOffer: {
          bankName: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  // ============================
  // 📌 Module Filter (loanInfo.existingLoans = module)
  // ============================
  if (module && module !== 'ALL') {
    whereCondition.eligibleLoanOffer = {
      loanType: module,
    };
  }

  // ============================
  // ⚡ Status Filter
  // ============================
  if (status && status !== 'ALL') {
    whereCondition.status = status;
  }

  const [applications, total] = await Promise.all([
    prisma.loanApplicationForm.findMany({
      where: { ...whereCondition },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        eligibleLoanOffer: {
          select: {
            eligibleLoan: true,
            bankName: true,
            loanType: true,
          },
        },
        loanRequest: {
          select: {
            loanAmount: true,
          },
        },
      },
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    }),

    prisma.loanApplicationForm.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: applications,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleApplication = async (id: string) => {
  const result = await prisma.loanApplicationForm.findUnique({
    where: { id },
    include: {
      personalInfo: true,
      user: { select: safeUserSelect },
      guarantorInfo: true,
      loanInfo: {
        include: {
          bankAccounts: true,
          creditCards: true,
          existingLoans: true,
        },
      },
      eligibleLoanOffer: true,
      employmentInformation: {
        include: {
          properties: true,
        },
      },
      loanRequest: true,
      document: true,
      residentialInformation: true,
      additionalDocument: true,
      personalGuarantor: {
        include: {
          document: true,
        },
      },
      businessGuarantor: {
        include: {
          document: true,
        },
      },
    },
  });

  result?.loanInfo?.bankAccounts.map((bank) => {
    return (bank.accountNumber = decrypt(bank.accountNumber));
  });

  return result;
};

const applicationFeedback = async (
  id: string,
  payload: {
    status: LoanStatus;
    adminNote: string;
    additionalDocuments: boolean;
  },
  adminId?: string, // pass the admin user id (or role)
) => {
  const result = await prisma.loanApplicationForm.findUnique({
    where: { id },
    include: {
      user: {
        select: { email: true, name: true, userId: true },
      },
    },
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Application not found');
  }

  // Store old status before update
  const previousStatus = result.status;

  let updated;
  if (payload.status === 'REJECTED') {
    updated = await prisma.loanApplicationForm.update({
      where: { id },
      data: {
        status: payload.status,
        adminNotes: payload.adminNote,
        additionalDocuments: payload.additionalDocuments,
        isActive: false,
      },
    });

    // Log to ApplicationEvent
    await prisma.applicationEvent.create({
      data: {
        applicationId: id,
        eventType: 'STATUS_CHANGED',
        stateBefore: previousStatus,
        stateAfter: payload.status,
        feedback: payload.adminNote,
        severity: 'ERROR',
        createdRole: 'SUPER_ADMIN',
      },
    });

    // Email
    const emailSubject = 'Loan Application Status: REJECTED';
    const bodyText = applicationRejected(
      result?.user?.name ?? '',
      result?.applicationId ?? '',
      payload?.adminNote ?? '',
    );
    await sendEmail(result?.user?.email, emailSubject, bodyText);

    return 'Email Sent Successfully';
  } else {
    updated = await prisma.loanApplicationForm.update({
      where: { id },
      data: {
        status: payload.status,
        additionalDocuments: payload.additionalDocuments,
        adminNotes: payload.adminNote,
        isActive: true,
      },
      include: {
        user: {
          select: { email: true, name: true },
        },
      },
    });

    // Log to ApplicationEvent
    await prisma.applicationEvent.create({
      data: {
        applicationId: id,
        eventType: 'STATUS_CHANGED',
        stateBefore: previousStatus,
        stateAfter: payload.status,
        feedback: payload.adminNote,
        severity: 'INFO',
        createdRole: 'SUPER_ADMIN',
      },
    });

    // Email
    const emailSubject = 'Loan Application Status Update';
    const templatePayload = {
      name: updated?.user?.name ?? '',
      applicationID: updated?.applicationId ?? '',
      status: updated?.status ?? '',
      reason: payload?.adminNote ?? '',
    };
    const bodyText = loanStatusEmail(templatePayload);
    await sendEmail(updated?.user?.email, emailSubject, bodyText);

    return 'Email Sent Successfully';
  }
};

const getStatusEvents = async (id: string) => {
  const result = await prisma.applicationEvent.findMany({
    where: {
      applicationId: id,
      eventType: 'STATUS_CHANGED',
    },

    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

export const ApplicationServides = {
  getAllApplication,
  getSingleApplication,
  applicationFeedback,
  getStatusEvents,
};
