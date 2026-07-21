export const applicationStatusUpdate = (
  applicantNum: string,
  applicantName: string,
  link: string,
) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Guarantor Request</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4fdf6; font-family: 'Segoe UI', sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4fdf6; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <tr>
              <td style="background-color: #2ecc71; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0;">Guarantor Confirmation form</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <p style="font-size: 16px; color: #2f2f2f;">
                  Dear,
                </p>
                <p style="font-size: 16px; color: #2f2f2f;">
                  You have been nominated as a <strong>loan guarantor</strong> by <strong>${applicantName}</strong> for their personal loan application on <strong>FinUpsBD</strong>.
                </p>
                <p style="font-size: 16px; color: #2f2f2f;">
                  Please review and full up this form by clicking the button below.
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${link}" style="background-color: #27ae60; color: #ffffff; padding: 14px 28px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block;">Review & Confirm</a>
                </div>
                <p style="font-size: 14px; color: #7f8c8d;">
                  Applicant Contact: ${applicantNum}
                </p>
                <p style="font-size: 14px; color: #7f8c8d;">
                  This request is time-sensitive and will expire in 72 hours. If you’re not expecting this, feel free to disregard this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #ecf9f1; padding: 20px; text-align: center; font-size: 13px; color: #7f8c8d;">
                © 2025 FinUps BD · Need help? <a href="mailto:support@finupsbd.com" style="color: #2ecc71; text-decoration: none;">support@finupsbd.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
};
