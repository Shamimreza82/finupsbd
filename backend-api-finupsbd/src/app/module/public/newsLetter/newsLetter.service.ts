import { prisma } from '../../../../app';
import sendEmail from '../../../utils/sendEmail';

const createNewsLetter = async (payload: { name: string; email: string }) => {
  const { email } = payload;
  const isExist = await prisma.newsLetter.findUnique({ where: { email } });
  if (isExist) {
    throw new Error('You’re already subscribed to our newsletter. Stay tuned for updates!');
  }
  const result = await prisma.newsLetter.create({ data: payload });

  const bodyText = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h1 style="color: #4CAF50; text-align: center;">Welcome to FinupsBD!</h1>
    <p>Hi there,</p>
    <p>Thank you for subscribing to our newsletter! We're excited to have you join our community. As a subscriber, you’ll receive:</p>
    <ul style="line-height: 1.8; color: #555;">
      <li>Exclusive updates on our latest products and services.</li>
      <li>Special offers and discounts just for you.</li>
      <li>Insights, tips, and resources to help you stay ahead.</li>
    </ul>
    <p>To make the most of your subscription, be sure to check your inbox regularly for our updates.</p>
    <p>Meanwhile, here are a few quick links to help you get started:</p>
    <ul style="line-height: 1.8; color: #555;">
      <li><a href="[https://www.finupsbd.com/]" style="color: #4CAF50; text-decoration: none;">Visit Our Website</a></li>
      <li><a href="[Link to Blog or Resources]" style="color: #4CAF50; text-decoration: none;">Explore Our Blog</a></li>
      <li><a href="[Link to Contact Page]" style="color: #4CAF50; text-decoration: none;">Contact Us</a></li>
    </ul>
    <p>If you have any questions or need assistance, feel free to reach out to us at 
      <a href="mailto:your-email@gmail.com" style="color: #4CAF50; text-decoration: none;">finupsbd@gmail.com</a>.
    </p>
    <p>Thank you for choosing FinupsBD. We look forward to keeping you informed and inspired!</p>
    <p>Best regards,</p>
    <p><strong>The FinupsBD Team</strong></p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #666; text-align: center;">
      You’re receiving this email because you subscribed to our newsletter. If this was a mistake or you no longer wish to receive updates, 
      <a href="[Unsubscribe Link]" style="color: #4CAF50; text-decoration: none;">click here to unsubscribe</a>.
    </p>
    <p style="font-size: 0.9em; color: #666; text-align: center;">
      FinupsBD | [Your Address or Location] | <a href="[Privacy Policy Link]" style="color: #4CAF50; text-decoration: none;">Privacy Policy</a>
    </p>
  </div>
`;

  await sendEmail(email, 'Subscription Successful!', bodyText);

  return result;
};

const getAllEmail = async () => {
  const result = await prisma.newsLetter.findMany();
  return result;
};

export const NewsLetterService = {
  createNewsLetter,
  getAllEmail,
};
