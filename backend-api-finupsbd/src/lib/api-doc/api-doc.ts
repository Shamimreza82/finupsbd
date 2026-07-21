import { ConfigFile } from '../../config';

const apiPrefix = '/api/v1';

const baseUrl = (ConfigFile.PORT && `http://localhost:${ConfigFile.PORT}`) || 'http://localhost:4000';

const standardSuccessResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    message: { type: 'string', example: 'Request successful' },
    statusCode: { type: 'integer', example: 200 },
    data: { nullable: true },
  },
};

const standardErrorResponse = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    message: { type: 'string', example: 'Request failed' },
    statusCode: { type: 'integer', example: 400 },
    error: {
      type: 'object',
      additionalProperties: true,
    },
  },
};

const bearerAuthSecurity = [{ bearerAuth: [] }];

const multipartSingleFileSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
  },
};

const paths = {
  '/health': {
    get: {
      tags: ['System'],
      summary: 'Health check',
      description: 'Returns server health status and current timestamp.',
      responses: {
        200: {
          description: 'Service is healthy',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'ok' },
                  timestamp: { type: 'integer', example: 1730903200000 },
                },
              },
            },
          },
        },
      },
    },
  },

  [`${apiPrefix}/auth/signUp`]: {
    post: {
      tags: ['Auth'],
      summary: 'Register user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthSignUpRequest' },
          },
        },
      },
      responses: {
        201: {
          description: 'User created',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/StandardSuccessResponse' } } },
        },
        400: { description: 'Validation error' },
      },
    },
  },

  [`${apiPrefix}/auth/validate-pin`]: {
    post: {
      tags: ['Auth'],
      summary: 'Validate signup PIN',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthValidatePinRequest' },
          },
        },
      },
      responses: {
        200: { description: 'PIN validated' },
      },
    },
  },

  [`${apiPrefix}/auth/login`]: {
    post: {
      tags: ['Auth'],
      summary: 'Login with email/phone and password',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/AuthLoginRequest' },
          },
        },
      },
      responses: {
        200: {
          description: 'Login success',
          content: { 'application/json': { schema: { $ref: '#/components/schemas/StandardSuccessResponse' } } },
        },
        401: { description: 'Invalid credentials' },
      },
    },
  },

  [`${apiPrefix}/auth/forget-password`]: {
    post: {
      tags: ['Auth'],
      summary: 'Request password reset by email',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: { type: 'string', format: 'email', example: 'user@example.com' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Reset process started' },
      },
    },
  },

  [`${apiPrefix}/auth/forget-password-phone`]: {
    post: {
      tags: ['Auth'],
      summary: 'Request password reset by phone',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                phone: { type: 'string', example: '+88017XXXXXXXX' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Reset process started' },
      },
    },
  },

  [`${apiPrefix}/auth/reset-password`]: {
    post: {
      tags: ['Auth'],
      summary: 'Reset password',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['newPassword'],
              properties: {
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' },
                newPassword: { type: 'string', minLength: 6 },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Password reset successfully' },
      },
    },
  },

  [`${apiPrefix}/auth/change-password`]: {
    post: {
      tags: ['Auth'],
      summary: 'Change password',
      security: bearerAuthSecurity,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['oldPassword', 'newPassword'],
              properties: {
                oldPassword: { type: 'string', minLength: 6 },
                newPassword: { type: 'string', minLength: 6 },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Password changed' },
        401: { description: 'Unauthorized' },
      },
    },
  },

  [`${apiPrefix}/auth/refresh-token`]: {
    post: {
      tags: ['Auth'],
      summary: 'Refresh access token from cookie refresh token',
      security: [{ cookieAuth: [] }],
      responses: {
        200: { description: 'Token refreshed' },
        401: { description: 'Invalid or expired refresh token' },
      },
    },
  },

  [`${apiPrefix}/auth/logout`]: {
    post: {
      tags: ['Auth'],
      summary: 'Logout current session',
      responses: {
        200: { description: 'Logged out successfully' },
      },
    },
  },

  [`${apiPrefix}/users`]: {
    get: {
      tags: ['Users'],
      summary: 'Get all users',
      security: bearerAuthSecurity,
      responses: {
        200: { description: 'Users fetched' },
      },
    },
  },

  [`${apiPrefix}/users/my-profile`]: {
    get: {
      tags: ['Users'],
      summary: 'Get own profile',
      security: bearerAuthSecurity,
      responses: {
        200: { description: 'Profile fetched' },
      },
    },
  },

  [`${apiPrefix}/users/{id}`]: {
    get: {
      tags: ['Users'],
      summary: 'Get single user by ID',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: {
        200: { description: 'User fetched' },
        404: { description: 'User not found' },
      },
    },
  },

  [`${apiPrefix}/users/get-all-new-loans/{id}`]: {
    get: {
      tags: ['Users'],
      summary: 'Get new loans for user',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Loan list returned' } },
    },
  },

  [`${apiPrefix}/users/get-all-existing-loan/{id}`]: {
    get: {
      tags: ['Users'],
      summary: 'Get existing loans for user',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Loan list returned' } },
    },
  },

  [`${apiPrefix}/users/get-all-rejects-loan/{id}`]: {
    get: {
      tags: ['Users'],
      summary: 'Get rejected loans for user',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Loan list returned' } },
    },
  },

  [`${apiPrefix}/users/get-application/{id}`]: {
    get: {
      tags: ['Users'],
      summary: 'Get application by ID for user context',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Application fetched' } },
    },
  },

  [`${apiPrefix}/users/create-addi-doc/{id}`]: {
    post: {
      tags: ['Users'],
      summary: 'Upload additional documents for a user application',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                files: {
                  type: 'array',
                  items: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'Documents uploaded' } },
    },
  },

  [`${apiPrefix}/users/agreement-doc/{id}`]: {
    get: {
      tags: ['Users'],
      summary: 'Get agreement document',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Agreement document returned' } },
    },
  },

  [`${apiPrefix}/profiles`]: {
    post: {
      tags: ['Profiles'],
      summary: 'Create profile with image upload',
      security: bearerAuthSecurity,
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              ...multipartSingleFileSchema,
              properties: {
                ...multipartSingleFileSchema.properties,
                data: {
                  type: 'string',
                  description: 'Optional JSON string with profile details',
                  example: '{"address":"Dhaka"}',
                },
              },
            },
          },
        },
      },
      responses: { 201: { description: 'Profile created' } },
    },
  },

  [`${apiPrefix}/public/emi-calculator`]: {
    post: {
      tags: ['Public'],
      summary: 'EMI calculator',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['loanAmount', 'interestRate', 'tenureMonths'],
              properties: {
                loanAmount: { type: 'number', example: 500000 },
                interestRate: { type: 'number', example: 12.5 },
                tenureMonths: { type: 'integer', example: 36 },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'EMI calculated' } },
    },
  },

  [`${apiPrefix}/news-letter`]: {
    post: {
      tags: ['Newsletter'],
      summary: 'Subscribe to newsletter',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: { email: { type: 'string', format: 'email' } },
            },
          },
        },
      },
      responses: { 201: { description: 'Subscribed successfully' } },
    },
    get: {
      tags: ['Newsletter'],
      summary: 'Get all subscribed emails',
      responses: { 200: { description: 'Emails fetched' } },
    },
  },

  [`${apiPrefix}/blogs/create-blog`]: {
    post: {
      tags: ['Blogs'],
      summary: 'Create blog',
      security: bearerAuthSecurity,
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              ...multipartSingleFileSchema,
              properties: {
                ...multipartSingleFileSchema.properties,
                title: { type: 'string' },
                content: { type: 'string' },
              },
            },
          },
        },
      },
      responses: { 201: { description: 'Blog created' } },
    },
  },

  [`${apiPrefix}/blogs/comment`]: {
    post: {
      tags: ['Blogs'],
      summary: 'Add blog comment',
      security: bearerAuthSecurity,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['blogId', 'comment'],
              properties: {
                blogId: { type: 'string' },
                comment: { type: 'string' },
                parentCommentId: { type: 'string', nullable: true },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'Comment added' } },
    },
  },

  [`${apiPrefix}/blogs/all-blogs`]: {
    get: {
      tags: ['Blogs'],
      summary: 'Get all blogs',
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: { type: 'integer', minimum: 1 },
        },
        {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer', minimum: 1, maximum: 100 },
        },
        {
          name: 'searchTerm',
          in: 'query',
          schema: { type: 'string' },
        },
      ],
      responses: { 200: { description: 'Blogs fetched' } },
    },
  },

  [`${apiPrefix}/blogs/single-blog/{id}`]: {
    get: {
      tags: ['Blogs'],
      summary: 'Get single blog',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Blog fetched' } },
    },
  },

  [`${apiPrefix}/blogs/{id}`]: {
    patch: {
      tags: ['Blogs'],
      summary: 'Update blog',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: { 200: { description: 'Blog updated' } },
    },
    delete: {
      tags: ['Blogs'],
      summary: 'Delete blog',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Blog deleted' } },
    },
  },

  [`${apiPrefix}/ai/mcp`]: {
    post: {
      tags: ['AI'],
      summary: 'AI MCP endpoint',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: { 200: { description: 'AI response generated' } },
    },
  },

  [`${apiPrefix}/application/create-application`]: {
    post: {
      tags: ['Applications'],
      summary: 'Create application',
      security: bearerAuthSecurity,
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                files: {
                  type: 'array',
                  items: { type: 'string', format: 'binary' },
                },
                data: {
                  type: 'string',
                  description: 'Stringified JSON payload',
                },
                loanRequest: {
                  type: 'string',
                  description: 'Stringified JSON payload',
                },
              },
            },
          },
        },
      },
      responses: { 201: { description: 'Application created' } },
    },
  },

  [`${apiPrefix}/application/applicant-guarator-info-personal`]: {
    post: {
      tags: ['Applications'],
      summary: 'Submit guarantor personal info',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                files: {
                  type: 'array',
                  items: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'Guarantor info saved' } },
    },
  },

  [`${apiPrefix}/application/applicant-guarator-info-business`]: {
    post: {
      tags: ['Applications'],
      summary: 'Submit guarantor business info',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                files: {
                  type: 'array',
                  items: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'Guarantor info saved' } },
    },
  },

  [`${apiPrefix}/application/my-loan-application`]: {
    get: {
      tags: ['Applications'],
      summary: 'Get my applications',
      security: bearerAuthSecurity,
      responses: { 200: { description: 'Applications fetched' } },
    },
  },

  [`${apiPrefix}/application`]: {
    get: {
      tags: ['Applications'],
      summary: 'Get all applications',
      responses: { 200: { description: 'Applications fetched' } },
    },
  },

  [`${apiPrefix}/application/application-tracking`]: {
    post: {
      tags: ['Applications'],
      summary: 'Track an application',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: { 200: { description: 'Tracking result returned' } },
    },
  },

  [`${apiPrefix}/application/application-forget`]: {
    post: {
      tags: ['Applications'],
      summary: 'Recover application',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: { 200: { description: 'Recovery response returned' } },
    },
  },

  [`${apiPrefix}/application/{id}`]: {
    get: {
      tags: ['Applications'],
      summary: 'Get application by ID',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Application fetched' } },
    },
  },

  [`${apiPrefix}/eligibility-check`]: {
    post: {
      tags: ['Eligibility'],
      summary: 'Check eligibility',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: { 200: { description: 'Eligibility computed' } },
    },
  },

  [`${apiPrefix}/eligibility-check/cards`]: {
    get: {
      tags: ['Eligibility'],
      summary: 'Get cards used in eligibility checks',
      responses: { 200: { description: 'Cards fetched' } },
    },
  },

  [`${apiPrefix}/bank-portal/auth/regiater`]: {
    post: {
      tags: ['Bank Portal Auth'],
      summary: 'Register bank portal user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: { 201: { description: 'Bank user registered' } },
    },
  },

  [`${apiPrefix}/bank-portal/auth/login`]: {
    post: {
      tags: ['Bank Portal Auth'],
      summary: 'Login bank portal user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: { 200: { description: 'Bank user logged in' } },
    },
  },

  [`${apiPrefix}/bank-portal/auth/me`]: {
    get: {
      tags: ['Bank Portal Auth'],
      summary: 'Get current bank portal user profile',
      responses: { 200: { description: 'Current bank user fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/application/get-all-application`]: {
    get: {
      tags: ['Super Admin Applications'],
      summary: 'Get all applications for super admin',
      responses: { 200: { description: 'Applications fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/application/get-single-application/{id}`]: {
    get: {
      tags: ['Super Admin Applications'],
      summary: 'Get single application for super admin',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Application fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/application/application-feedback/{id}`]: {
    patch: {
      tags: ['Super Admin Applications'],
      summary: 'Update application feedback/status',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['status'],
              properties: {
                status: { type: 'string', example: 'APPROVED' },
                message: { type: 'string', example: 'Looks good' },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'Feedback updated' } },
    },
  },

  [`${apiPrefix}/super-admin/application/status-events/{id}`]: {
    get: {
      tags: ['Super Admin Applications'],
      summary: 'Get application status events',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Events fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/users/get-all-users`]: {
    get: {
      tags: ['Super Admin Users'],
      summary: 'Get all users (super admin)',
      security: bearerAuthSecurity,
      responses: { 200: { description: 'Users fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/users/get-single-user/{id}`]: {
    get: {
      tags: ['Super Admin Users'],
      summary: 'Get single user (super admin)',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'User fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/dashboard/dashboard-home`]: {
    get: {
      tags: ['Super Admin Dashboard'],
      summary: 'Get dashboard home metrics',
      responses: { 200: { description: 'Dashboard metrics returned' } },
    },
  },

  [`${apiPrefix}/super-admin/dashboard/modules`]: {
    get: {
      tags: ['Super Admin Dashboard'],
      summary: 'Get all configurable modules',
      responses: { 200: { description: 'Modules fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/dashboard/modules-status/{id}`]: {
    patch: {
      tags: ['Super Admin Dashboard'],
      summary: 'Change module status',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['isActive'],
              properties: {
                isActive: { type: 'boolean', example: true },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'Status changed' } },
    },
  },

  [`${apiPrefix}/super-admin/loans`]: {
    post: {
      tags: ['Super Admin Loans'],
      summary: 'Create loan product',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              ...multipartSingleFileSchema,
              properties: {
                ...multipartSingleFileSchema.properties,
                payload: {
                  type: 'string',
                  description: 'Loan product fields',
                },
              },
            },
          },
        },
      },
      responses: { 201: { description: 'Loan product created' } },
    },
    get: {
      tags: ['Super Admin Loans'],
      summary: 'Get all loan products',
      responses: { 200: { description: 'Loan products fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/loans/{id}`]: {
    get: {
      tags: ['Super Admin Loans'],
      summary: 'Get loan product by ID',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Loan product fetched' } },
    },
    patch: {
      tags: ['Super Admin Loans'],
      summary: 'Update loan product',
      security: bearerAuthSecurity,
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: multipartSingleFileSchema,
          },
        },
      },
      responses: { 200: { description: 'Loan product updated' } },
    },
  },

  [`${apiPrefix}/super-admin/cards`]: {
    post: {
      tags: ['Super Admin Cards'],
      summary: 'Create card product',
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: multipartSingleFileSchema,
          },
        },
      },
      responses: { 201: { description: 'Card product created' } },
    },
    get: {
      tags: ['Super Admin Cards'],
      summary: 'Get all card products',
      responses: { 200: { description: 'Card products fetched' } },
    },
  },

  [`${apiPrefix}/super-admin/cards/{id}`]: {
    get: {
      tags: ['Super Admin Cards'],
      summary: 'Get card product by ID',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      responses: { 200: { description: 'Card product fetched' } },
    },
    patch: {
      tags: ['Super Admin Cards'],
      summary: 'Update card product',
      parameters: [{ $ref: '#/components/parameters/IdPathParam' }],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: multipartSingleFileSchema,
          },
        },
      },
      responses: { 200: { description: 'Card product updated' } },
    },
  },
};

export const specs = {
  openapi: '3.0.3',
  info: {
    title: 'FinupsBD Backend API',
    version: '1.0.0',
    description:
      'Production-grade OpenAPI documentation for FinupsBD backend services, including auth, application processing, eligibility checks, public calculators, and super-admin management endpoints.',
    contact: {
      name: 'FinupsBD Engineering',
      email: 'support@finupsbd.com',
    },
  },
  servers: [
    {
      url: baseUrl,
      description: 'Local/Configured server',
    },
    {
      url: 'https://api.finupsbd.com',
      description: 'Production server',
    },
  ],
  tags: [
    { name: 'System', description: 'System and service level endpoints' },
    { name: 'Auth', description: 'User authentication and session management' },
    { name: 'Users', description: 'User account and document operations' },
    { name: 'Profiles', description: 'Profile creation and media upload operations' },
    { name: 'Public', description: 'Public APIs with no authentication required' },
    { name: 'Newsletter', description: 'Newsletter subscription and listing APIs' },
    { name: 'Blogs', description: 'Blog creation, listing, and interaction APIs' },
    { name: 'AI', description: 'AI assistant or model interaction endpoints' },
    { name: 'Applications', description: 'Loan application lifecycle APIs' },
    { name: 'Eligibility', description: 'Eligibility computation and card matching APIs' },
    { name: 'Bank Portal Auth', description: 'Bank portal user auth endpoints' },
    { name: 'Super Admin Applications', description: 'Super admin application management endpoints' },
    { name: 'Super Admin Users', description: 'Super admin user management endpoints' },
    { name: 'Super Admin Dashboard', description: 'Super admin dashboard and module state APIs' },
    { name: 'Super Admin Loans', description: 'Loan product management endpoints' },
    { name: 'Super Admin Cards', description: 'Card product management endpoints' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'refreshToken',
      },
    },
    parameters: {
      IdPathParam: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Resource identifier',
        schema: {
          type: 'string',
          example: 'cm4z7m2v50000l8abcxyz1234',
        },
      },
    },
    schemas: {
      StandardSuccessResponse: standardSuccessResponse,
      StandardErrorResponse: standardErrorResponse,
      AuthSignUpRequest: {
        type: 'object',
        required: ['name', 'email', 'phone', 'password'],
        properties: {
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          phone: { type: 'string', example: '+8801712345678' },
          password: { type: 'string', minLength: 6, example: 'StrongPass123' },
        },
      },
      AuthValidatePinRequest: {
        type: 'object',
        required: ['phone', 'pin'],
        properties: {
          phone: { type: 'string', example: '+8801712345678' },
          pin: { type: 'string', minLength: 4, example: '123456' },
        },
      },
      AuthLoginRequest: {
        type: 'object',
        required: ['identifier', 'password'],
        properties: {
          identifier: {
            type: 'string',
            description: 'Email or phone',
            example: 'john@example.com',
          },
          password: { type: 'string', minLength: 6, example: 'StrongPass123' },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Bad request',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/StandardErrorResponse' },
          },
        },
      },
      Unauthorized: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/StandardErrorResponse' },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/StandardErrorResponse' },
          },
        },
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/StandardErrorResponse' },
          },
        },
      },
    },
  },
  paths,
} as const;
