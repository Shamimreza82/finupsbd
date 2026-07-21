export const protechedRoute = [
  "/login",
  "/register",
  "/user",
  "/user/:path*",
  "/admin",
  "/admin/:path*",
  "/super-admin",
  "/super-admin/:path*",
  "/loan-application",
]





export const LoanStatus = {
  SUBMITTED: "SUBMITTED",
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
} as const;