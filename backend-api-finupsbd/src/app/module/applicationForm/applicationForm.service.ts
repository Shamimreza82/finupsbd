/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../../app';
import { ConfigFile } from '../../../config';
import AppError from '../../error/AppError';
import { TLoanRequest, TMiddlewareUser, TUploadedFile } from '../../types/commonTypes';
import { gurantorEmailTemplate } from '../../utils/email-template/gurantor';
import { encrypt } from '../../utils/encryption';
import { generateApplicationId } from '../../utils/generateApplicationId';
import maskMobileNumber from '../../utils/maskedMobileNumber';
import sendEmail from '../../utils/sendEmail';
import { LoanApplicationFormSchema, TLoanApplicationForm } from './applicationForm.validation';
import { saveFileLoanApplication } from '../../utils/file-uploads/saveFileLoanApplication';

///// old after terjaction

// const createApplicationForm = async (payload: TLoanApplicationForm, user: TMiddlewareUser, files: TUploadedFile[], loanRequest: TLoanRequest) => {
//   const cloudinaryResults: { url: any; originalName: string; mimeType: string; }[] = [];
//   const filesObj = files as unknown as { [fieldname: string]: Express.Multer.File[] };
//   const filesArray: Express.Multer.File[] = Object.values(filesObj).flat();

//   for (const file of filesArray) {
//     const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname, file.mimetype);
//     cloudinaryResults.push({
//       url: uploaded.secure_url,
//       originalName: file.originalname,
//       mimeType: file.mimetype,
//     });
//   }

//   const applicationId = await generateApplicationId();

//   const gurantorInfo = {
//     businessGurantorEmail: payload?.guarantorInfo?.businessGuarantor?.emailAddress ?? '',
//     businessGurantorPhone: payload?.guarantorInfo?.businessGuarantor?.mobileNumber ?? '',
//     personalGurantorEmail: payload?.guarantorInfo?.personalGuarantor?.emailAddress ?? '',
//     personalGurantorphone: payload?.guarantorInfo?.personalGuarantor?.mobileNumber ?? ''
//   }

//   // Begin Transaction
//   const result = await prisma.$transaction(async (tx) => {
//     const createdApplication = await tx.loanApplicationForm.create({
//       data: {
//         applicationId,
//         userId: user.userId,
//         personalInfo: {
//           create: payload.personalInfo,
//         },
//         residentialInformation: {
//           create: payload.residentialInfo,
//         },
//         // employmentInformation: {
//         //   create: payload.employmentInfo,
//         // },
//         loanInfo: {
//           create: {
//             hasCreditCard: payload?.loanInfo?.hasCreditCard ?? false,
//             hasExistingLoan: payload?.loanInfo?.hasExistingLoan ?? false,
//             bankAccounts: {
//               create: payload?.loanInfo?.bankAccounts,
//             },
//             creditCards: {
//               create: payload?.loanInfo?.creditCards,
//             },
//             existingLoans: {
//               create: payload?.loanInfo?.existingLoans,
//             },
//           },
//         },
//         loanRequest: {
//           create: payload.loanRequest,
//         },
//         GuarantorInfo: {
//           create: gurantorInfo
//         },
//         Document: {
//           create: cloudinaryResults.map(doc => ({
//             url: doc.url,
//             originalName: doc.originalName,
//             mimeType: doc.mimeType,
//           })),
//         },
//         EligibleLoanOffer: {
//           create: loanRequest
//         }

//       },

//       include: {
//         GuarantorInfo: true,
//         user: {
//           select: {
//             name: true,
//             phone: true,
//             email: true
//           }
//         }
//       }
//     });

//     return createdApplication;
//   }, {
//     maxWait: 10000, // Max wait time in ms before giving up acquiring a transaction
//     timeout: 15000  // Total allowed time for the transaction to finish (in ms)
//   });

//   console.log("result",result)

//   if (result) {
//     const personaGurantor = result?.GuarantorInfo?.personalGurantorEmail
//     const businessGurantor = result?.GuarantorInfo?.businessGurantorEmail

//     console.log("email",personaGurantor, businessGurantor)

//     const linkPersonalGurantor = `${ConfigFile.CLIENT_URL}/guarantor-info/personal-guarantor?applicationId=${result?.applicationId}&id=${result?.id}`
//     const linkBusinessGurantor = `${ConfigFile.CLIENT_URL}/guarantor-info/business-guarantor?applicationId=${result?.applicationId}&id=${result?.id}`

//     const personaGurantorTemplate = gurantorEmailTemplate(result?.user?.phone ?? '', result?.user?.name ?? '', linkPersonalGurantor)
//     const businessGurantorTemplate = gurantorEmailTemplate(result?.user?.phone ?? '', result?.user?.name ?? '', linkBusinessGurantor)

//     await sendEmail(personaGurantor ?? '', "Gurantor Info Request", personaGurantorTemplate)
//     await sendEmail(businessGurantor ?? '', "Gurantor Info Request", businessGurantorTemplate)

//     console.log("email send")
//   }

//   return result;
// };

// const createApplicationForm = async (
//   data: TLoanApplicationForm,
//   user: TMiddlewareUser,
//   files: TUploadedFile[],
//   loanRequest: TLoanRequest
// ) => {

//   const payload = LoanApplicationFormSchema.parse(data)

//   try {
//     // Parse files and upload to Cloudinary
//     const cloudinaryResults: { url: string; originalName: string; mimeType: string }[] = [];
//     const filesObj = files as unknown as { [fieldname: string]: Express.Multer.File[] };
//     const filesArray: Express.Multer.File[] = Object.values(filesObj).flat();

//     for (const file of filesArray) {
//       try {
//         const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname, file.mimetype);
//         cloudinaryResults.push({
//           url: uploaded.secure_url,
//           originalName: file.originalname,
//           mimeType: file.mimetype,
//         });
//       } catch (err) {
//         console.error(`Failed to upload ${file.originalname}:`, err);
//         // Optionally: continue or throw depending on business rules
//       }
//     }

//     const applicationId = await generateApplicationId();

//     payload?.loanInfo?.bankAccounts.map(bank => {
//       return bank.accountNumber = encrypt(bank.accountNumber)
//     })

//     const guarantorInfoData = {
//       businessGurantorEmail: payload?.guarantorInfo?.businessGuarantor?.emailAddress ?? '',
//       businessGurantorPhone: payload?.guarantorInfo?.businessGuarantor?.mobileNumber ?? '',
//       personalGurantorEmail: payload?.guarantorInfo?.personalGuarantor?.emailAddress ?? '',
//       personalGurantorphone: payload?.guarantorInfo?.personalGuarantor?.mobileNumber ?? '',
//     };

//     // Begin DB Transaction
//     const createdApplication = await prisma.$transaction(async (tx) => {
//       return await tx.loanApplicationForm.create({
//         data: {
//           applicationId,
//           userId: user.userId,

//           personalInfo: { create: payload.personalInfo },
//           residentialInformation: { create: payload.residentialInfo },
//           employmentInformation: {
//             create: {
//               ...payload.employmentInfo,
//               properties: { create: payload?.employmentInfo?.properties ?? [] }
//             }
//           },
//           loanInfo: {
//             create: {
//               hasCreditCard: payload.loanInfo?.hasCreditCard ?? false,
//               hasExistingLoan: payload.loanInfo?.hasExistingLoan ?? false,
//               bankAccounts: { create: payload.loanInfo?.bankAccounts ?? [] },
//               creditCards: { create: payload.loanInfo?.creditCards ?? [] },
//               existingLoans: { create: payload.loanInfo?.existingLoans ?? [] },
//             },
//           },

//           loanRequest: { create: payload.loanRequest },
//           guarantorInfo: { create: guarantorInfoData },

//           document: {
//             create: cloudinaryResults.map((doc) => ({
//               url: doc.url,
//               originalName: doc.originalName,
//               mimeType: doc.mimeType,
//             })),
//           },

//           eligibleLoanOffer: {
//             create: loanRequest,
//           },
//         },

//         include: {
//           guarantorInfo: true,
//           user: {
//             select: { name: true, phone: true, email: true },
//           },
//           loanInfo: {
//             include: {
//               bankAccounts: true
//             }
//           }
//         },
//       });
//     }, {
//       maxWait: 10000,
//       timeout: 15000,
//     });

//     // Notify Guarantors via Email
//     const { guarantorInfo, user: applicant } = createdApplication;

//     const emailTasks: Promise<any>[] = [];

//     if (guarantorInfo?.personalGurantorEmail) {
//       const personalGuarantorLink = `${ConfigFile.CLIENT_URL}/guarantor-info/personal-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
//       const personalTemplate = gurantorEmailTemplate(applicant.phone ?? '', applicant.name ?? '', personalGuarantorLink);
//       emailTasks.push(sendEmail(guarantorInfo.personalGurantorEmail, "Personal Guarantor Info Request", personalTemplate));
//     }

//     if (guarantorInfo?.businessGurantorEmail) {
//       const businessGuarantorLink = `${ConfigFile.CLIENT_URL}/guarantor-info/business-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
//       const businessTemplate = gurantorEmailTemplate(applicant.phone ?? '', applicant.name ?? '', businessGuarantorLink);
//       emailTasks.push(sendEmail(guarantorInfo.businessGurantorEmail, "Business Guarantor Info Request", businessTemplate));
//     }

//     try {
//       await Promise.all(emailTasks);
//     } catch (emailErr) {
//       console.error("Email sending failed:", emailErr);
//     }
//     console.log("All emails sent successfully.");
//     return createdApplication;

//   } catch (error) {
//     console.error("Error while creating loan application form:", error);
//     let message = "Failed to process loan application. Please try again.";
//     if (error && typeof error === "object" && "message" in error && typeof (error as any).message === "string") {
//       message = (error as any).message;
//     }
//     throw new AppError(502, message);
//   }
// };
const createApplicationForm = async (
  data: TLoanApplicationForm,
  user: TMiddlewareUser,
  files: any,
  loanRequest: TLoanRequest,
) => {
  const payload = LoanApplicationFormSchema.parse(data);

  const applicationId = await generateApplicationId();
  try {
    // Save files locally instead of uploading to Cloudinary
    const savedDocuments: {
      filePath: string;
      originalName: string;
      mimeType: string;
    }[] = [];

    const images: TUploadedFile[] = files.files;

    for (const file of images) {
      try {
        const savedPath = await saveFileLoanApplication(
          file.buffer,
          file.originalname,
          applicationId,
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

    console.log(savedDocuments);

    payload?.loanInfo?.bankAccounts?.forEach((bank) => {
      bank.accountNumber = encrypt(bank.accountNumber);
    });

    const guarantorInfoData = {
      businessGurantorEmail: payload?.guarantorInfo?.businessGuarantor?.emailAddress ?? '',
      businessGurantorPhone: payload?.guarantorInfo?.businessGuarantor?.mobileNumber ?? '',
      personalGurantorEmail: payload?.guarantorInfo?.personalGuarantor?.emailAddress ?? '',
      personalGurantorphone: payload?.guarantorInfo?.personalGuarantor?.mobileNumber ?? '',
    };

    // DB Transaction
    const createdApplication = await prisma.$transaction(
      async (tx) => {
        return await tx.loanApplicationForm.create({
          data: {
            applicationId,
            userId: user.userId,
            personalInfo: { create: payload.personalInfo },
            residentialInformation: { create: payload.residentialInfo },
            employmentInformation: {
              create: {
                ...payload.employmentInfo,
                properties: {
                  create: payload?.employmentInfo?.properties ?? [],
                },
              },
            },
            loanInfo: {
              create: {
                hasCreditCard: payload.loanInfo?.hasCreditCard ?? false,
                hasExistingLoan: payload.loanInfo?.hasExistingLoan ?? false,
                bankAccounts: { create: payload.loanInfo?.bankAccounts ?? [] },
                creditCards: { create: payload.loanInfo?.creditCards ?? [] },
                existingLoans: {
                  create: payload.loanInfo?.existingLoans ?? [],
                },
              },
            },
            loanRequest: { create: payload.loanRequest },
            guarantorInfo: { create: guarantorInfoData },

            document: {
              create: savedDocuments.map((doc) => ({
                // save relative path for easier serving
                url: doc.filePath,
                originalName: doc.originalName,
                mimeType: doc.mimeType,
              })),
            },

            eligibleLoanOffer: { create: loanRequest },
          },

          include: {
            guarantorInfo: true,
            user: {
              select: { name: true, phone: true, email: true },
            },
            loanInfo: {
              include: {
                bankAccounts: true,
              },
            },
          },
        });
      },
      {
        maxWait: 10000,
        timeout: 15000,
      },
    );

    // Notify Guarantors via Email
    const { guarantorInfo, user: applicant } = createdApplication;

    const emailTasks: Promise<any>[] = [];

    if (guarantorInfo?.personalGurantorEmail) {
      const personalGuarantorLink = `${ConfigFile.CLIENT_URL}/guarantor-info/personal-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
      const personalTemplate = gurantorEmailTemplate(
        applicant.phone ?? '',
        applicant.name ?? '',
        personalGuarantorLink,
      );
      emailTasks.push(
        sendEmail(
          guarantorInfo.personalGurantorEmail,
          'Personal Guarantor Info Request',
          personalTemplate,
        ),
      );
    }

    if (guarantorInfo?.businessGurantorEmail) {
      const businessGuarantorLink = `${ConfigFile.CLIENT_URL}/guarantor-info/business-guarantor?applicationId=${createdApplication.applicationId}&id=${createdApplication.id}`;
      const businessTemplate = gurantorEmailTemplate(
        applicant.phone ?? '',
        applicant.name ?? '',
        businessGuarantorLink,
      );
      emailTasks.push(
        sendEmail(
          guarantorInfo.businessGurantorEmail,
          'Business Guarantor Info Request',
          businessTemplate,
        ),
      );
    }

    try {
      await Promise.all(emailTasks);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
    }

    console.log('All emails sent successfully.');
    return createdApplication;
  } catch (error) {
    console.error('Error while creating loan application form:', error);
    let message = 'Failed to process loan application. Please try again.';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof (error as any).message === 'string'
    ) {
      message = (error as any).message;
    }
    throw new AppError(502, message);
  }
};

const myLoanApplication = async (user: TMiddlewareUser) => {
  const { userId } = user;

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      LoanApplicationForm: {
        include: {
          personalInfo: true,
          loanInfo: true,
          document: true,
          loanRequest: true,
          employmentInformation: true,
          eligibleLoanOffer: true,
          guarantorInfo: true,
          residentialInformation: true,
        },
      },
    },
  });

  console.log(result);

  return result;
};

const getAllApplicationForm = async () => {
  const result = await prisma.loanApplicationForm.findMany({
    include: {
      personalInfo: true,
      user: true,
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

  return result;
};

// const updateStatus = async (id: string, payload: {status: LoanStatus, adminNotes: string}) => {
// console.log(payload)
//   const result = await prisma.loanApplicationForm.update({
//     where: {id},
//     data: {
//       status: payload.status,
//       adminNotes: payload.adminNotes,
//     },
//     include: {
//       user: true
//     }

//   })

//   return result;
// }
const getSingleApplication = async (id: string) => {
  const result = await prisma.loanApplicationForm.findFirst({
    where: { id },
    include: {
      residentialInformation: true,
    },
  });

  return result;
};

const applicationTracking = async (payload: { applicationId: string; phone: string }) => {
  console.log(payload);
  const result = await prisma.loanApplicationForm.findFirst({
    where: {
      applicationId: payload.applicationId,
      user: {
        phone: payload.phone,
      },
    },
    select: {
      status: true,
      adminNotes: true,
      applicationId: true,
      loanRequest: true,
      eligibleLoanOffer: true,
      user: {
        select: {
          name: true,
          userId: true,
          profile: true,
        },
      },
    },
  });

  if (!result) {
    throw new AppError(404, 'Application not found please enter valid Phone and Application ID');
  }

  return result;
};

const applicationForget = async (payload: { email: string; phone: string }) => {
  const result = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { phone: payload.phone }],
    },
    include: {
      LoanApplicationForm: {
        select: {
          applicationId: true,
          eligibleLoanOffer: true,
        },
      },
    },
  });

  console.log(result);

  if (!result || !result.LoanApplicationForm || result.LoanApplicationForm.length === 0) {
    throw new AppError(404, 'No Loan application found!');
  }

  //   // Prepare application details for email
  const applications = result.LoanApplicationForm.map((app) => ({
    applicationId: app.applicationId,
    loanType: app.eligibleLoanOffer?.loanType || 'Unknown',
  }));

  const applicationDetails = applications
    .map(
      (app) =>
        `<li><strong>Application ID:</strong> ${app.applicationId}, <strong>Loan Type:</strong> ${app.loanType}</li>`,
    )
    .join('');
  console.log(applicationDetails);
  const subject = 'Your Application ID';

  const html = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; background-color: #28a745; color: #ffffff; padding: 15px 0; border-radius: 8px 8px 0 0;">
      <h2 style="margin: 0; font-size: 20px;">FinupsBD</h2>
      <p style="margin: 0; font-size: 14px;">Helping you achieve your financial goals</p>
    </div>
    <p style="font-size: 16px; font-weight: bold; color: #444;">Dear ${result?.name},</p>
    <p style="font-size: 14px; color: #555;">
      Thank you for submitting your application. We have successfully received your details, and they are now under review. Below are the details of your application:
    </p>
    <ul style="font-size: 14px; color: #444; padding-left: 20px; list-style-type: disc;">
      ${applicationDetails}
    </ul>
    <p style="font-size: 14px; color: #555;">
      If you have any questions or need further assistance, please don't hesitate to contact our support team at 
      <a href="mailto:finupsbd@gmail.com" style="color: #28a745; text-decoration: underline; font-weight: bold;">finupsbd@gmail.com</a>.
    </p>
    <p style="font-size: 14px; color: #555;">
      We appreciate your trust in us and look forward to serving you.
    </p>
    <p style="font-size: 14px; color: #555;">Best regards,</p>
    <p style="font-size: 16px; font-weight: bold; color: #28a745;">FinupsBD Team</p>
    <footer style="margin-top: 20px; background-color: #f4f4f4; padding: 10px; border-radius: 8px; text-align: center; font-size: 12px; color: #777;">
      <p style="margin: 0;">© 2025 FinupsBD. All rights reserved.</p>
    </footer>
  </div>
`;

  await sendEmail(result.email, subject, html);

  const maskedPhoneNumber = maskMobileNumber(result.phone);
  const userEmail = result.email;
  const maskedEmailAddress = maskMobileNumber(result.email);

  return {
    maskedPhoneNumber,
    userEmail,
    maskedEmailAddress,
  };
};

export const ApplicationFromService = {
  createApplicationForm,
  getAllApplicationForm,
  // updateStatus,
  getSingleApplication,
  applicationTracking,
  applicationForget,
  myLoanApplication,
};
