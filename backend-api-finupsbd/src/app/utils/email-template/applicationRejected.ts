export const applicationRejected = (name: string, applicationID: string, reason?: string) => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f4f6f8; padding: 40px;">
    <div style="max-width: 620px; margin: auto; background-color: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06); border: 1px solid #e9ecef;">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="https://finupsbd.com/logo.png" alt="FinUps BD" style="height: 50px; margin-bottom: 12px;">
        <h2 style="color: #dc3545; font-size: 24px; margin: 0;">Loan Application Status</h2>
      </div>

      <!-- Greeting -->
      <p style="font-size: 16px; color: #333; margin: 0 0 16px;">
        Dear <strong>${name}</strong>,
      </p>

      <!-- Main message -->
      <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 16px;">
        We have carefully reviewed your loan application 
        <strong>(ID: ${applicationID})</strong>, and we regret to inform you that it has been 
        <span style="color: #dc3545; font-weight: 600;">rejected</span>.
      </p>

      ${
        reason
          ? `<p style="background-color: #fff4f4; border-left: 4px solid #dc3545; padding: 12px 16px; font-size: 14px; color: #555; line-height: 1.5; border-radius: 6px; margin-bottom: 16px;">
              <strong>Reason:</strong> ${reason}
            </p>`
          : ''
      }

      <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 16px;">
        We understand this may be disappointing. You are welcome to reapply after addressing the concerns mentioned above.
      </p>

      <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 24px;">
        If you would like more details regarding this decision, please reach out to our support team at 
        <a href="mailto:support@finupsbd.com" style="color: #0d6efd; text-decoration: none;">support@finupsbd.com</a>.
      </p>

      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 24px;">
        <a href="https://finupsbd.com" 
           style="background-color: #0d6efd; color: #ffffff; padding: 12px 24px; font-size: 15px; font-weight: 500; border-radius: 6px; text-decoration: none; display: inline-block;">
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
