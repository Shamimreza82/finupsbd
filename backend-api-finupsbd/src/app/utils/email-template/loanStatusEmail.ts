type LoanStatus = 'SUBMITTED' | 'PENDING' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

interface LoanEmailOptions {
  name: string;
  applicationID: string;
  status: LoanStatus;
  reason?: string; // Optional note
}

const statusConfig: Record<LoanStatus, { color: string; title: string; message: string }> = {
  SUBMITTED: {
    color: '#0d6efd',
    title: 'Application Submitted',
    message: 'We have received your loan application and will review it soon.',
  },
  PENDING: {
    color: '#ffc107',
    title: 'Application Pending',
    message: 'Your loan application is pending review.',
  },
  IN_PROGRESS: {
    color: '#17a2b8',
    title: 'Application In Progress',
    message: 'Your application is being reviewed.',
  },
  APPROVED: {
    color: '#28a745',
    title: 'Application Approved',
    message: 'Your application has been approved. We’ll contact you soon.',
  },
  REJECTED: {
    color: '#dc3545',
    title: 'Application Rejected',
    message: 'We regret to inform you your application has been rejected.',
  },
  COMPLETED: {
    color: '#6f42c1',
    title: 'Loan Process Completed',
    message: 'Your loan process has been completed successfully.',
  },
};

export const loanStatusEmail = ({ name, applicationID, status, reason }: LoanEmailOptions) => {
  const { color, title, message } = statusConfig[status];

  return `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f4f6f8; padding: 40px;">
    <div style="max-width: 620px; margin: auto; background-color: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06); border: 1px solid #e9ecef;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="https://finupsbd.com/logo.png" alt="FinUps BD" style="height: 50px; margin-bottom: 12px;">
        <h2 style="color: ${color}; font-size: 24px; margin: 0;">${title}</h2>
      </div>

      <!-- Greeting -->
      <p style="font-size: 16px; color: #333; margin: 0 0 16px;">
        Dear <strong>${name}</strong>,
      </p>

      <!-- Main message -->
      <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 16px;">
        ${message}
      </p>

      <!-- Optional reason -->
      ${
        reason
          ? `<p style="background-color: #f8f9fa; border-left: 4px solid ${color}; padding: 12px 16px; font-size: 14px; color: #555; line-height: 1.5; border-radius: 6px; margin-bottom: 16px;">
              <strong>Note:</strong> ${reason}
            </p>`
          : ''
      }

      <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 24px;">
        Application ID: <strong>${applicationID}</strong>
      </p>

      <!-- CTA -->
      <div style="text-align: center; margin-top: 24px;">
        <a href="https://finupsbd.com" 
           style="background-color: ${color}; color: #ffffff; padding: 12px 24px; font-size: 15px; font-weight: 500; border-radius: 6px; text-decoration: none; display: inline-block;">
          View Other Loan Options
        </a>
      </div>

      <!-- Footer -->
      <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #999; text-align: center; line-height: 1.4;">
        &copy; ${new Date().getFullYear()} FinUps BD. All rights reserved.<br>
        FinUps BD, Dhaka, Bangladesh
      </p>
    </div>
  </div>
  `;
};
