export const verificationPINEmailTemplate = (name: string, userId: string) => {
  return `
   <head>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .email-container {
        width: 100%;
        background-color: #f4f4f4;
        padding: 20px 0;
        animation: fadeIn 0.8s ease-out;
      }
      .email-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 40px;
        border-radius: 8px;
        border-top: 4px solid #28a745;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.8s ease-out 0.2s both;
      }
      .email-header {
        text-align: center;
        padding-bottom: 20px;
      }
      .email-header h2 {
        color: #28a745;
        font-size: 28px;
        margin: 0;
      }
      .email-body {
        font-size: 16px;
        line-height: 1.6;
        color: #333;
      }
      .cta-button {
        display: inline-block;
        background-color: #28a745;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        font-size: 16px;
        border-radius: 4px;
        margin-top: 20px;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: #218838;
      }
      .footer {
        text-align: center;
        padding-top: 30px;
        font-size: 12px;
        color: #777;
      }
      .footer a {
        color: #28a745;
        text-decoration: none;
      }
      .social-icons img {
        width: 24px;
        margin: 0 10px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
      }
      .social-icons img:hover {
        opacity: 1;
      }
      @media (max-width: 600px) {
        .email-content {
          padding: 20px;
        }
        .email-header h2 {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="email-container">
      <tr>
        <td align="center">
          <table role="presentation" class="email-content">
            <tr class="email-header">
              <td>
                <!-- You can swap this for your actual logo if you wish -->
                <h2>Welcome to FinupsBd, ${name}!</h2>
              </td>
            </tr>
            <tr class="email-body">
              <td>
                <p>Dear ${name},</p>
                <p><strong>UserID:</strong> ${userId}</p>
                <p>Thank you for joining <strong>FinupsBd</strong>! We’re thrilled to have you as part of our community.</p>
                <p>At FinupsBd, our goal is to provide top-notch services and a seamless experience. Our team is here to guide you every step of the way.</p>
                <p>To get started, explore our platform, and if you need assistance, don’t hesitate to reach out to our support team.</p>
                <a href="https://www.finupsbd.com/" class="cta-button">Visit Website</a>
              </td>
            </tr>
            <tr class="footer">
              <td>
                <p>&copy; ${new Date().getFullYear()} FinupsBd. All rights reserved.</p>
                <p>Shimultoly, Gazipur</p>
                <div class="social-icons">
                  <a href="https://facebook.com/finupsbd"><img src="facebook-icon.png" alt="Facebook"></a>
                  <a href="https://twitter.com/finupsbd"><img src="twitter-icon.png" alt="Twitter"></a>
                  <a href="https://linkedin.com/company/finupsbd"><img src="linkedin-icon.png" alt="LinkedIn"></a>
                </div>
                <p><a href="https://finupsbd.com/unsubscribe">Unsubscribe</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
`;
};
