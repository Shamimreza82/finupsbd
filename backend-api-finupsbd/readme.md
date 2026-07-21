# FinupsBD Backend

## Overview

This repository contains the backend system for FinupsBD, a comprehensive platform for financial services. It handles user authentication, loan applications, eligibility checks, and provides a secure and scalable foundation for the FinupsBD application.

## Features

- **User Management**: Secure user registration, login, and profile management.
- **Role-Based Access Control**: Differentiated access for Users, Admins, and Super Admins.
- **Loan Application**: End-to-end loan application processing for various loan types.
- **Eligibility Checks**: Automated eligibility assessment for different financial products.
- **AI Integration**: Utilizes OpenAI and Google Generative AI for enhanced features.
- **Secure Authentication**: JWT-based authentication with refresh tokens.
- **File Uploads**: Securely handles file uploads to Cloudinary.
- **Notifications**: Email notifications for key events.
- **Rate Limiting**: Protects the API from brute-force attacks.
- **Caching**: Redis for improved performance.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Caching**: Redis
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **AI Integration**: OpenAI, Google Generative AI
- **API Validation**: Zod
- **Deployment**: Vercel

## API Documentation

### Authentication

| Method | Endpoint                       | Description                                           |
| :----- | :----------------------------- | :---------------------------------------------------- |
| `POST` | `/api/v1/auth/signUp`          | Register a new user.                                  |
| `POST` | `/api/v1/auth/validate-pin`    | Validate the PIN sent to the user's email.            |
| `POST` | `/api/v1/auth/login`           | Authenticate a user and generate a token.             |
| `POST` | `/api/v1/auth/forget-password` | Send a password reset link to the user's email.       |
| `POST` | `/api/v1/auth/reset-password`  | Reset the user's password.                            |
| `POST` | `/api/v1/auth/change-password` | Change the user's password. (Authentication required) |
| `POST` | `/api/v1/auth/refresh-token`   | Refresh the JWT access token.                         |
| `POST` | `/api/v1/auth/logout`          | Log the user out.                                     |

### Users

| Method | Endpoint                                | Description                                       |
| :----- | :-------------------------------------- | :------------------------------------------------ |
| `GET`  | `/api/v1/users`                         | Get all users. (Admin/Super Admin only)           |
| `GET`  | `/api/v1/users/my-profile`              | Get the current user's profile.                   |
| `GET`  | `/api/v1/users/:id`                     | Get a single user by ID. (Admin/Super Admin only) |
| `GET`  | `/api/v1/users/get_all_application/:id` | Get all applications for a user. (User only)      |

### Profile

| Method | Endpoint           | Description            |
| :----- | :----------------- | :--------------------- |
| `POST` | `/api/v1/profiles` | Create a user profile. |

### Application Form

| Method | Endpoint                                               | Description                                           |
| :----- | :----------------------------------------------------- | :---------------------------------------------------- |
| `POST` | `/api/v1/application/create-application`               | Create a new loan application.                        |
| `POST` | `/api/v1/application/applicant-guarator-info-personal` | Add personal guarantor information to an application. |
| `POST` | `/api/v1/application/applicant-guarator-info-business` | Add business guarantor information to an application. |
| `GET`  | `/api/v1/application/my-loan-application`              | Get the current user's loan applications.             |
| `GET`  | `/api/v1/application`                                  | Get all loan applications. (Admin/Super Admin only)   |
| `POST` | `/api/v1/application/application-tracking`             | Track the status of a loan application.               |
| `POST` | `/api/v1/application/application-forget`               | Resend application details to the user.               |
| `GET`  | `/api/v1/application/:id`                              | Get a single loan application by ID.                  |

### Super Admin

| Method  | Endpoint                                         | Description                             |
| :------ | :----------------------------------------------- | :-------------------------------------- |
| `GET`   | `/api/v1/super-admin/get-all-application`        | Get all loan applications.              |
| `GET`   | `/api/v1/super-admin/get-single-application/:id` | Get a single loan application by ID.    |
| `PATCH` | `/api/v1/super-admin/application-feedback/:id`   | Provide feedback on a loan application. |

### Loans

| Method  | Endpoint                    | Description                 |
| :------ | :-------------------------- | :-------------------------- |
| `POST`  | `/api/v1/personal-loan`     | Create a new personal loan. |
| `GET`   | `/api/v1/personal-loan`     | Get all personal loans.     |
| `PATCH` | `/api/v1/personal-loan/:id` | Update a personal loan.     |
| `POST`  | `/api/v1/instant-loan`      | Create a new instant loan.  |
| `GET`   | `/api/v1/instant-loan`      | Get all instant loans.      |
| `PATCH` | `/api/v1/instant-loan/:id`  | Update an instant loan.     |
| `POST`  | `/api/v1/home-loan`         | Create a new home loan.     |
| `GET`   | `/api/v1/home-loan`         | Get all home loans.         |
| `PATCH` | `/api/v1/home-loan/:id`     | Update a home loan.         |
| `POST`  | `/api/v1/car-loan`          | Create a new car loan.      |
| `GET`   | `/api/v1/car-loan`          | Get all car loans.          |
| `PATCH` | `/api/v1/car-loan/:id`      | Update a car loan.          |
| `POST`  | `/api/v1/sme-loan`          | Create a new SME loan.      |
| `GET`   | `/api/v1/sme-loan`          | Get all SME loans.          |
| `PATCH` | `/api/v1/sme-loan/:id`      | Update an SME loan.         |
| `POST`  | `/api/v1/credit-card`       | Create a new credit card.   |
| `GET`   | `/api/v1/credit-card`       | Get all credit cards.       |

### Eligibility Check

| Method | Endpoint                    | Description                   |
| :----- | :-------------------------- | :---------------------------- |
| `POST` | `/api/v1/eligibility-check` | Check eligibility for a loan. |

### Public

| Method | Endpoint              | Description                     |
| :----- | :-------------------- | :------------------------------ |
| `POST` | `/api/v1/news-letter` | Subscribe to the newsletter.    |
| `GET`  | `/api/v1/news-letter` | Get all newsletter subscribers. |

### Blogs

| Method   | Endpoint                    | Description                   |
| :------- | :-------------------------- | :---------------------------- |
| `POST`   | `/api/v1/blogs`             | Create a new blog post.       |
| `POST`   | `/api/v1/blogs/comment/:id` | Add a comment to a blog post. |
| `GET`    | `/api/v1/blogs`             | Get all blog posts.           |
| `PATCH`  | `/api/v1/blogs/:id`         | Update a blog post.           |
| `DELETE` | `/api/v1/blogs/:id`         | Delete a blog post.           |

### OpenAI

| Method | Endpoint                               | Description                     |
| :----- | :------------------------------------- | :------------------------------ |
| `POST` | `/api/v1/openai/assistant/:id/message` | Interact with the AI assistant. |

### Bank Portal

| Method | Endpoint                            | Description                          |
| :----- | :---------------------------------- | :----------------------------------- |
| `POST` | `/api/v1/bank-portal/auth/register` | Register a new bank user.            |
| `POST` | `/api/v1/bank-portal/auth/login`    | Authenticate a bank user.            |
| `GET`  | `/api/v1/bank-portal/auth/me`       | Get the current bank user's profile. |
| `POST` | `/api/v1/bank-portal/applyed-loans` | Get all applied loans for a bank.    |

## Setup Instructions

### Prerequisites

- Node.js >= 18.x
- npm or Yarn
- PostgreSQL database
- Redis server

### Steps

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/finupsbd-backend.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd finupsbd-backend
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Set up environment variables**:
    Create a `.env` file in the root of the project and add the following variables:
    ```env
    NODE_ENV=development
    PORT=5000
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    BCRYPT_SALT_ROUNDS=12
    DEFAULT_PASS=your_default_password
    JWT_ACCESS_SECRET=your_jwt_access_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    JWT_ACCESS_EXPIRES_IN=1d
    JWT_REFRESH_EXPIRES_IN=365d
    RESET_PASS_UI_LINK=http://localhost:3000/reset-password
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    SUPER_ADMIN_PASSWORD=your_super_admin_password
    ```
5.  **Run database migrations**:
    ```bash
    npx prisma migrate dev
    ```
6.  **Start the development server**:
    ```bash
    npm run dev
    ```

## Project Structure

```
.
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── app/
│   │   ├── middleware/     # Express middleware
│   │   ├── module/         # Application modules (auth, loans, etc.)
│   │   ├── utils/          # Utility functions
│   │   └── ...
│   ├── config/             # Application configuration
│   └── server.ts           # Server entry point
├── .env.example            # Example environment variables
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## Contact

For any queries, feel free to contact:

- **Email**: [shamimrezaone@gmail.com](mailto:shamimrezaone@gmail.com)
- **What's app**: [+8801531297879](+8801531297879)
