/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import AppError from '../../error/AppError';
import { TMiddlewareUser, TUploadedFile } from '../../types/commonTypes';
import { saveFileAdditional } from '../../utils/file-uploads/saveFileAdditional';
import { toWords } from 'number-to-words';
import dayjs from 'dayjs';
import { numberToBanglaWords } from '../../utils/numberToBanglaWords';
import { calculateEMI } from '../../utils/calculateEMI';

type FilterParams = {
  searchTerm?: boolean;
  role?: string;
  status?: string;
  skip?: number;
  take?: number;
};

const getAllUser = async (query: FilterParams) => {
  try {
    const conditions: any[] = [];

    // Apply role filter if provided.
    if (query.role) {
      conditions.push({ role: query.role });
    }

    // Apply status filter if provided.
    if (query.status) {
      conditions.push({ status: query.status });
    }

    // Use searchTerm as a boolean flag.
    // For demonstration, if searchTerm is true, include users with a non-empty name.
    if (query.searchTerm) {
      conditions.push({ name: { not: '' } });
    }

    // Combine conditions if any filters are applied.
    const whereClause = conditions.length > 0 ? { AND: conditions } : {};

    // Set pagination parameters; defaults: skip = 0, take = 10.
    const skip = query.skip ?? 0;
    const take = query.take ?? 10;

    // Query the database including the user's profile.
    const data = await prisma.user.findMany({
      where: whereClause,
      include: {
        profile: true,
      },
      skip,
      take,
    });

    // Count the total records matching the filters.
    const totalCount = await prisma.user.count({
      where: whereClause,
    });

    // Return the data along with pagination status.
    return {
      data,
      pagination: {
        skip,
        take,
        totalCount,
        currentPage: Math.floor(skip / take) + 1,
        totalPages: Math.ceil(totalCount / take),
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Could not fetch users');
  }
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
    },
  });

  return result;
};

const meProfile = async (user: any) => {
  const result = await prisma.user.findFirst({
    where: { email: user?.email as string },
    select: {
      name: true,
      email: true,
      phone: true,
      role: true,
      profile: true,
      isActive: true,
      emailVerified: true,
    },
  });

  if (!result) throw new Error('User not found');
  return result;
};

const getAllNewLoans = async (id: string) => {
  const result = await prisma.loanApplicationForm.findMany({
    where: {
      user: {
        id: id,
      },
      status: {
        in: ['SUBMITTED', 'IN_PROGRESS', 'PENDING'],
      },
    },
    include: {
      eligibleLoanOffer: true,
      loanRequest: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getAllExistingLoans = async (id: string) => {
  const result = await prisma.loanApplicationForm.findMany({
    where: {
      user: {
        id: id,
      },
      status: {
        in: ['COMPLETED'],
      },
    },
    include: {
      eligibleLoanOffer: true,
      loanRequest: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getAllRejectsLoans = async (id: string) => {
  const result = await prisma.loanApplicationForm.findMany({
    where: {
      user: {
        id: id,
      },
      status: {
        in: ['REJECTED'],
      },
    },
    include: {
      eligibleLoanOffer: true,
      loanRequest: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getApplication = async (id: string) => {
  const result = await prisma.loanApplicationForm.findUnique({
    where: { id },
    include: {
      eligibleLoanOffer: {
        select: {
          loanType: true,
        },
      },
    },
  });

  return result;
};

const createAdiDoc = async (id: string, files: TUploadedFile[], user: TMiddlewareUser) => {
  const isExistApplication = await prisma.loanApplicationForm.findUnique({
    where: { id },
  });

  if (!isExistApplication) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Application not found');
  }

  try {
    // Save files locally instead of uploading to Cloudinary
    const savedDocuments: {
      filePath: string;
      originalName: string;
      mimeType: string;
    }[] = [];

    const images: TUploadedFile[] = files;

    for (const file of images) {
      try {
        const savedPath = await saveFileAdditional(
          file.buffer,
          file.originalname,
          isExistApplication?.applicationId,
        ); // or file.originalname
        savedDocuments.push({
          filePath: savedPath,
          originalName: file.originalname,
          mimeType: file.mimetype,
        });
      } catch (err) {
        console.error(`Failed to save file ${file.fieldname}:`, err);
      }
    }

    const uploadFileIntoDb = await prisma.additionalDocument.createMany({
      data: savedDocuments.map((doc) => ({
        url: doc.filePath,
        originalName: doc.originalName,
        mimeType: doc.mimeType,
        loanApplicationFormId: id,
      })),
    });

    if (uploadFileIntoDb.count > 0) {
      await prisma.loanApplicationForm.update({
        where: { id },
        data: {
          status: 'PENDING',
          adminNotes:
            'Your document has been submitted successfully. Our review team will now carefully assess it before proceeding to the next steps.',
          additionalDocumentSubmit: true,
          additionalDocuments: false,
        },
      });
    }
  } catch (err) {
    console.error(`Failed to save file :`, err);
  }
};

// const createAdiDoc = async (
//   id: string,                      // LoanApplicationForm.id
//   files: TUploadedFile[],
//   user: TMiddlewareUser           // who triggered this action
// ) => {
//   if (!files?.length) {
//     throw new AppError(StatusCodes.BAD_REQUEST, "No files provided");
//   }

//   const app = await prisma.loanApplicationForm.findUnique({
//     where: { id },
//     select: { id: true, applicationId: true }, // applicationId = human readable code
//   });

//   if (!app) {
//     throw new AppError(StatusCodes.NOT_FOUND, "Application not found");
//   }

//   // Persist files to disk
//   const savedDocuments: {
//     filePath: string;
//     originalName: string;
//     mimeType: string;
//     size?: number;
//   }[] = [];

//   for (const file of files) {
//     try {
//       const savedPath = await saveFileAdditional(
//         file.buffer,
//         file.originalname,
//         app.applicationId // use human-friendly code in the path
//       );
//       savedDocuments.push({
//         filePath: savedPath,
//         originalName: file.originalname,
//         mimeType: file.mimetype,
//         size: file.size,
//       });
//     } catch (err) {
//       // log a file-level error event (outside the tx) so you still get a breadcrumb
//       await prisma.applicationEvent.create({
//         data: {
//           applicationId: app.id, // IMPORTANT: relational id
//           eventType: "OTHER",
//           description: `Failed to save file "${file.originalname}"`,
//           createdBy: user?.userId,
//         },
//       });
//       // continue; do not throw here to allow other files to process
//       // or, choose to throw to fail the whole request if ANY file fails
//     }
//   }

//   if (!savedDocuments.length) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "Failed to save files"
//     );
//   }

//   const newStatus = "PENDING" as const;
//   const adminNote =
//     "Your document has been submitted successfully. Our review team will now carefully assess it before proceeding to the next steps.";

//   // One transaction = DB writes + audit events
//   return await prisma.$transaction(async (tx) => {
//     // 1) Insert file rows
//     const createDocs = await tx.additionalDocument.createMany({
//       data: savedDocuments.map((doc) => ({
//         url: doc.filePath,
//         originalName: doc.originalName,
//         mimeType: doc.mimeType,
//         loanApplicationFormId: app.id,
//       })),
//     });

//     if (createDocs.count === 0) {
//       throw new AppError(
//         StatusCodes.INTERNAL_SERVER_ERROR,
//         "Files could not be recorded"
//       );
//     }

//     // 2) Update application status/flags/notes
//     const updated = await tx.loanApplicationForm.update({
//       where: { id: app.id },
//       data: {
//         status: newStatus,
//         adminNotes: adminNote,
//         additionalDocumentSubmit: true,
//         additionalDocuments: false,
//       },
//       select: { id: true, status: true, adminNotes: true, applicationId: true },
//     });

//     // 3) Create audit events (bulk)
//     const events: {
//       applicationId: string;
//       eventType: ApplicationEventType;
//       description?: string;
//       createdBy?: string | null;
//     }[] = [];

//     events.push({
//       applicationId: app.id,
//       eventType: "ADDITIONAL_DOCUMENTS_UPLOADED",
//       description: `${createDocs.count} file(s) uploaded`,
//       createdBy: user?.userId,
//     });

//     events.push({
//       applicationId: app.id,
//       eventType: "STATUS_UPDATED",
//       description: `Feedback:${createDocs?.count}Status changed to ${updated.status}`,
//       createdBy: user?.userId,
//     });

//     events.push({
//       applicationId: app.id,
//       eventType: "ADMIN_NOTE_ADDED",
//       description: "Admin note updated after additional documents",
//       createdBy: user?.userId,
//     });

//     await tx.applicationEvent.createMany({ data: events });

//     return {
//       success: true,
//       message: "Additional documents submitted and events recorded",
//       data: {
//         applicationId: updated.applicationId,
//         status: updated.status,
//         uploadedCount: createDocs.count,
//       },
//     };
//   });
// };

const getAgreementDoc = async (id: string) => {
  try {
    const result = await prisma.loanApplicationForm.findUnique({
      where: { id },
      include: {
        user: true,
        personalInfo: true,
        loanRequest: true,
        residentialInformation: true,
        eligibleLoanOffer: true,
      },
    });

    if (!result) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Application not found');
    }

    const loanAmountInWord = toWords(Number(result?.loanRequest?.loanAmount) || 0) + ' taka only';
    const loanAmountInBangla = numberToBanglaWords(Number(result?.loanRequest?.loanAmount));
    const dueDate = dayjs(result?.updatedAt || '')
      .add(result?.eligibleLoanOffer?.periodMonths || 0, 'month')
      .format('YYYY-MM-DD');
    const presentAddress = `${result?.residentialInformation?.presentAddress || ''}, ${result?.residentialInformation?.presentThana || ''}, ${result?.residentialInformation?.presentDistrict || ''}\n ${result?.residentialInformation?.presentDivision || ''} - ${result?.residentialInformation?.presentPostalCode || ''}`;
    const calculateEMIValue = Math.round(
      calculateEMI(
        Number(result?.loanRequest?.loanAmount),
        Number(result?.eligibleLoanOffer?.interestRate) || 0,
        Number(result?.loanRequest?.loanTenure),
      ),
    );

    const data = {
      id: result?.id,
      applicationId: result?.applicationId,
      fullName: result?.personalInfo?.fullName,
      nid: result?.personalInfo?.NIDNumber,
      loanName: result?.eligibleLoanOffer?.bankName,
      loanType: result?.eligibleLoanOffer?.loanType,
      presrntAddress: presentAddress,
      requstedAmount: result?.loanRequest?.loanAmount,
      eligibleLoan: result?.eligibleLoanOffer?.eligibleLoan,
      interestRate: result?.eligibleLoanOffer?.interestRate,
      periodMonths: result?.eligibleLoanOffer?.periodMonths,
      monthlyEMI: calculateEMIValue,
      processingFee: result?.eligibleLoanOffer?.processingFee,
      loanAmountInWord: loanAmountInWord,
      loanAmountInBangla: loanAmountInBangla,
      loanTenure: result?.eligibleLoanOffer?.periodMonths,
      emiStartDate: result?.loanRequest?.emiStartDate,
      applicationDate: result?.updatedAt,
      dueDate: dueDate,
    };
    return data;
  } catch (error) {
  }
};

export const UserServices = {
  getAllUser,
  meProfile,
  getSingleUser,
  getAllNewLoans,
  getAllExistingLoans,
  getAllRejectsLoans,
  getApplication,
  createAdiDoc,
  getAgreementDoc,
};
