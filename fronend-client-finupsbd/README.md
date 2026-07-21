# FinUps BD - Frontend

This is the frontend for the FinUps BD web application, a financial services platform designed to help users in Bangladesh apply for and manage loans.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Learn More](#learn-more)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **State Management**: React Context
- **Testing**: [Jest](https://jestjs.io/)
- **Linting/Formatting**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Features

- **User Authentication**: Secure login, registration, and password reset functionality.
- **Loan Eligibility Checker**: A tool for users to determine their eligibility for various loan products.
- **Multi-Step Loan Application**: An intuitive, multi-step form for submitting loan applications.
- **Application Tracking**: Allows users to monitor the status of their loan applications.
- **Guarantor Information**: Sections for providing personal and business guarantor details.
- **Public-Facing Pages**: Includes a homepage, service details, testimonials, and articles.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) installed on your machine.

### Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/your_username/finupsbd-frontend-main.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd finupsbd-frontend-main
    ```
3.  Install NPM packages:
    ```bash
    pnpm install
    ```

### Running the Application

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `pnpm dev`: Runs the app in development mode.
- `pnpm build`: Builds the app for production.
- `pnpm start`: Starts a production server.
- `pnpm lint`: Lints the code using Next.js' built-in ESLint configuration.

## Folder Structure

Here is a high-level overview of the project's structure:

```
.
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router, pages and layouts
│   ├── components/      # Reusable React components
│   ├── context/         # React context for state management
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── services/        # API service calls
│   └── ...
├── .eslintrc.json       # ESLint configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!//