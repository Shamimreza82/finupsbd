export const mailBodyText = async (bankLoginId: string, bankName: string, blockedAt: string) => {
  const bodyText = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Account Security Alert | FinUps BD</title>
  <style>
    /* Modern Reset */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    
    body, h1, h2, h3, p, ul, ol {
      margin: 0;
      padding: 0;
    }
    
    /* Base Styles */
    body {
      font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background-color: #f5f7fa;
      color: #333;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Container */
    .wrapper {
      width: 100%;
      padding: 40px 20px;
      background-color: #f5f7fa;
    }
    
    .container {
      max-width: 560px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      padding: 32px 20px;
      text-align: center;
      position: relative;
    }
    
    .header img {
      height: 40px;
      margin-bottom: 8px;
    }
    
    .header-title {
      color: #fff;
      font-size: 17px;
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    
    /* Content */
    .content {
      padding: 40px 32px;
    }
    
    .content h2 {
      font-size: 24px;
      color: #1e293b;
      margin-bottom: 24px;
      font-weight: 600;
      line-height: 1.3;
    }
    
    .content p {
      margin-bottom: 18px;
      font-size: 16px;
      color: #4b5563;
    }
    
    .meta-info {
      background-color: #f8fafc;
      border-radius: 10px;
      padding: 16px;
      margin: 24px 0;
      border-left: 4px solid #4361ee;
    }
    
    .meta-info p {
      margin-bottom: 6px;
      font-size: 14px;
    }
    
    .meta-info .label {
      font-weight: 600;
      color: #1e293b;
    }
    
    .content ol {
      margin: 24px 0 28px 24px;
    }
    
    .content ol li {
      margin-bottom: 16px;
      color: #4b5563;
    }
    
    /* Button */
    .btn-container {
      text-align: center;
      margin: 32px 0;
    }
    
    .btn {
      display: inline-block;
      padding: 14px 28px;
      background: #4361ee;
      color: #fff;
      font-weight: 500;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
      transition: all 0.3s ease;
      font-size: 16px;
      text-decoration: none;
    }
    
    .btn:hover {
      background: #3a0ca3;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(67, 97, 238, 0.3);
    }
    
    .manual-link {
      text-align: center;
      margin-top: 16px;
      padding: 16px;
      background-color: #f8fafc;
      border-radius: 10px;
      font-size: 13px;
      color: #64748b;
      word-break: break-all;
    }
    
    .manual-link a {
      color: #4361ee;
      text-decoration: none;
    }
    
    /* Footer */
    .footer {
      background-color: #f8fafc;
      padding: 24px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    
    .footer a {
      color: #4361ee;
      text-decoration: none;
    }
    
    .social-links {
      margin: 16px 0;
    }
    
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      color: #64748b;
    }
    
    .divider {
      margin: 0 6px;
      color: #cbd5e1;
    }
    
    /* Alert Icon */
    .alert-icon {
      background-color: #f8fafc;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      border: 6px solid #ffffff;
      margin-top: -56px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    
    .alert-icon svg {
      width: 28px;
      height: 28px;
      color: #ef4444;
    }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 20px 12px;
      }
      
      .content {
        padding: 30px 20px;
      }
      
      .header {
        padding: 24px 16px;
      }
      
      .btn {
        padding: 12px 24px;
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Header with logo -->
      <div class="header">
        <img src="https://your-cdn.com/logo.png" alt="FinUps BD Logo" />
        <div class="header-title">Account Security Notice</div>
      </div>
      
      <!-- Main content -->
      <div class="content">
        <div class="alert-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        
        <h2>Your account has been temporarily locked</h2>
        
        <p>Hi, <strong>${bankName}</strong>,</p>
        
        <div class="meta-info">
          <p><span class="label">Account ID:</span> ${bankLoginId}</p>
          <p><span class="label">Event:</span> Multiple failed login attempts</p>
          <p><span class="label">Time:</span> ${blockedAt}</p>
        </div>
        
        <p>We have detected <strong>three consecutive failed login attempts</strong> on your FinUps BD account. As a security precaution, we've temporarily restricted access to your account.</p>
        
        <p><strong>What you need to do:</strong></p>
        
        <ol>
          <li>If you weren't trying to log in, please contact our security team immediately as your account may have been targeted.</li>
          <li>Consider enabling two-factor authentication after regaining access for enhanced security.</li>
          <li>For Reset password contect finups support team </li>
        </ol>
        <p>We are committed to keeping your financial information secure. Thank you for your cooperation.</p>
        <p>Regards,<br/>
        The FinupsBD Security Team</p>
      </div>
      
      <!-- Footer with contact info -->
      <div class="footer">
        <div>FinUps BD • 123 Fintech Street, Dhaka, Bangladesh</div>
        <div style="margin-top: 10px;">
          <a href="mailto:support@finupsbd.com">support@finupsbd.com</a> 
          <span class="divider">|</span> 
          <a href="tel:+8801XXXXXXXXX">+8801719185563</a>
        </div>
        
        <div class="social-links">
          <a href="#">Twitter</a>
          <span class="divider">|</span>
          <a href="#">Facebook</a>
          <span class="divider">|</span>
          <a href="#">LinkedIn</a>
        </div>
        
        <div style="margin-top: 16px; font-size: 12px;">
          © 2025 Finups BD. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  return bodyText;
};
