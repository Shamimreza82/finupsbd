import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponses from '../../utils/sendResponce';
import { ApplicationFromService } from './applicationForm.service';
import { TMiddlewareUser, TMulterFile } from '../../types/commonTypes';
import { uploadBufferToCloudinary } from '../../utils/FilesUploader';
import { prisma } from '../../../app';
import AppError from '../../error/AppError';
import { saveSingleFile } from '../../utils/file-uploads/saveSingleFile';
import { saveFileGuarantor } from '../../utils/file-uploads/saveFileGuarantor';

const createApplicationForm = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new Error('No files uploaded');
  }
  const files = req.files as Express.Multer.File[];
  const user = req.user as TMiddlewareUser;
  const rawData = req.body.data;
  const loanRequest = req.body.loanRequest;

  const result = await ApplicationFromService.createApplicationForm(
    JSON.parse(rawData),
    user,
    files,
    JSON.parse(loanRequest),
  );

  sendResponses(res, {
    success: true,
    message: 'Loan Application form created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const getAllApplicationForm = catchAsync(async (req, res) => {
  const result = await ApplicationFromService.getAllApplicationForm();

  sendResponses(res, {
    success: true,
    message: 'retrive all application successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// const statusUpdate = catchAsync(async (req, res) => {

//   const {id} = req.params;

//   const result = await ApplicationFromService.updateStatus(id, req.body);

//   sendResponses(res, {
//     success: true,
//     message: 'Application Create successfully',
//     statusCode: StatusCodes.CREATED,
//     data: result,
//   });
// });

const getSingleApplication = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ApplicationFromService.getSingleApplication(id);

  sendResponses(res, {
    success: true,
    message: 'get single application ',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const myLoanApplication = catchAsync(async (req, res) => {
  const user = req.user as TMiddlewareUser;

  const result = await ApplicationFromService.myLoanApplication(user);

  sendResponses(res, {
    success: true,
    message: 'get my loan application successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const applicationTracking = catchAsync(async (req, res) => {
  const result = await ApplicationFromService.applicationTracking(req.body);

  sendResponses(res, {
    success: true,
    message: 'Application track successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

const applicationForget = catchAsync(async (req, res) => {
  const result = await ApplicationFromService.applicationForget(req.body);
  console.log(req.body);

  sendResponses(res, {
    success: true,
    message: `We have sent your tracking ID to your registered Email: ${result.userEmail} Mobile Number +88${result.maskedPhoneNumber}`,
    statusCode: StatusCodes.OK,
    data: result,
  });
});

////garuantor info update with existing form

const applicantGuarantorInfoPersonal = catchAsync(async (req, res) => {
  const files = req.files as TMulterFile[] | undefined;
  const id = req.query.id as string;

  const data = req.body.data;
  const applicationId = req.body.applicationId;
  const guarantorData = JSON.parse(data);

  const isExist = await prisma.personalGuarantor.findUnique({
    where: { id },
  });

  console.log({ guarantorData });

  if (isExist) {
    throw new AppError(StatusCodes.CONFLICT, 'You already fill up this from Thank you');
  }

  if (!files || files.length === 0) {
    return sendResponses(res, {
      success: false,
      message: 'No guarantor files were uploaded.',
      statusCode: StatusCodes.BAD_REQUEST,
      data: {},
    });
  }

  // 2. Iterate over each file.buffer and upload to Cloudinary
  const uploadPromises = files.map(async (file, idx) => {
    // You can set folder:"guarantor" and resource_type:"image" (or "raw" if PDF, etc.)
    const result = await saveFileGuarantor(
      file?.buffer,
      file?.originalname,
      'gurantor',
      'personalGurantor',
      applicationId,
    );

    return {
      originalName: file.originalname,
      url: result,
      mimeType: file.mimetype,
    };
  });

  // 3. Wait for all uploads
  const uploadedFiles = await Promise.all(uploadPromises);

  const existingGuarantor = await prisma.personalGuarantor.findUnique({
    where: { loanApplicationFormId: id },
  });

  if (!existingGuarantor) {
    await prisma.personalGuarantor.create({
      data: {
        ...guarantorData,
        loanApplicationFormId: id,
        document: {
          create: uploadedFiles.map((doc) => ({
            url: doc.url,
            originalName: doc.originalName,
            mimeType: doc.mimeType,
          })),
        },
      },
      include: {
        document: true,
      },
    });
  } else {
    throw new AppError(StatusCodes.CONFLICT, 'You Already fillup this form');
  }

  // 4. Respond with the Cloudinary URLs / IDs (or save them to your DB here)
  return sendResponses(res, {
    success: true,
    message: 'Personal Guarantor form created successfully',
    statusCode: StatusCodes.CREATED,
    data: {},
  });
});

////garuantor info update with existing form Business

const applicantGuarantorInfoBusiness = catchAsync(async (req, res) => {
  const files = req.files as TMulterFile[] | undefined;
  const id = req.query.id as string;

  const data = req.body.data;
  const applicationId = req.body.applicationId;
  const guarantorData = JSON.parse(data);

  const isExist = await prisma.businessGuarantor.findUnique({
    where: { id },
  });

  if (isExist) {
    throw new AppError(StatusCodes.CONFLICT, 'You already fill up this from Thank you');
  }

  if (!files || files.length === 0) {
    return sendResponses(res, {
      success: false,
      message: 'No guarantor files were uploaded.',
      statusCode: StatusCodes.BAD_REQUEST,
      data: {},
    });
  }

  // 2. Iterate over each file.buffer and upload to Cloudinary
  const uploadPromises = files.map(async (file, idx) => {
    // You can set folder:"guarantor" and resource_type:"image" (or "raw" if PDF, etc.)
    const result = await saveFileGuarantor(
      file?.buffer,
      file?.originalname,
      'gurantor',
      'businessGurantor',
      applicationId,
    );

    return {
      originalName: file.originalname,
      url: result,
      mimeType: file.mimetype,
    };
  });

  // 3. Wait for all uploads
  const uploadedFiles = await Promise.all(uploadPromises);

  console.log(uploadedFiles);

  console.log('applicationId', id);

  const existingGuarantor = await prisma.businessGuarantor.findUnique({
    where: { loanApplicationFormId: id },
  });

  if (!existingGuarantor) {
    await prisma.businessGuarantor.create({
      data: {
        ...guarantorData,
        loanApplicationFormId: id,
        document: {
          create: uploadedFiles.map((doc) => ({
            url: doc.url,
            originalName: doc.originalName,
            mimeType: doc.mimeType,
          })),
        },
      },
    });
  } else {
    throw new AppError(StatusCodes.CONFLICT, 'You Already fillup this form');
  }

  // 4. Respond with the Cloudinary URLs / IDs (or save them to your DB here)
  return sendResponses(res, {
    success: true,
    message: 'Business Guarantor form created successfully',
    statusCode: StatusCodes.CREATED,
    data: {
      uploadedFiles, // array of { originalName, public_id, secure_url, ... }
    },
  });
});

export const ApplicationController = {
  createApplicationForm,
  applicantGuarantorInfoPersonal,
  applicantGuarantorInfoBusiness,
  getAllApplicationForm,
  // createPersonalInfo,
  // statusUpdate,
  getSingleApplication,
  applicationTracking,
  applicationForget,
  myLoanApplication,
};
