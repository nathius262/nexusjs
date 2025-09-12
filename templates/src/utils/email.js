import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// --- Transporter Setup ---
let transporter;

// If in development, fake transporter (console log only)
if (process.env.NODE_ENV === 'development') {
  transporter = {
    sendMail: async (mailOptions) => {
      console.log('📧 Simulated Email Sent:');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('HTML:', mailOptions.html);
      return { accepted: [mailOptions.to], messageId: 'simulated-dev-id' };
    }
  };
} else {
  // Real transporter for production
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST,
    port: process.env.ZOHO_PORT,
    secure: true, // true for 465
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });
}

// --- Generic Email Sender ---
export const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Petra ICT Hub" <${process.env.ZOHO_USER}>`,
    to,
    subject,
    html,
  };
  return transporter.sendMail(mailOptions);
};

// --- Templates ---
export const courseActivationTemplate = (courseTitle, durationWeeks) => `
  <div style="font-family: 'Poppins', sans-serif; background-color: #f8f9fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background-color: #105341; padding: 16px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 22px;">Petra ICT Hub</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 24px; color: #212529; font-size: 15px; line-height: 1.6;">
        <h2 style="color: #105341;">Congratulations 🎉</h2>
        <p>Your enrollment for <strong>${courseTitle}</strong> has been <span style="color: #105341;">activated</span>.</p>
        <p>The course will run for <strong>${durationWeeks} weeks</strong>.</p>
        <p>We’re excited to have you onboard. 🚀</p>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #eee; padding: 16px 24px; font-size: 14px; color: #555;">
        <p style="margin: 4px 0;">Best regards,</p>
        <p style="margin: 4px 0; font-weight: bold; color: #105341;">Petra ICT Hub Team</p>
      </div>
    </div>
  </div>
`;

export const passwordResetOtpTemplate = (name, otp) => `
  <div style="font-family: Poppins, sans-serif; background:#f8f9fa; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #eee;">
      <h2 style="color:#105341;">Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>You requested to reset your password. Use the OTP below to proceed:</p>
      <div style="background:#defeab; color:#105341; font-size:24px; font-weight:bold; padding:10px; text-align:center; border-radius:6px; letter-spacing:3px;">
        ${otp}
      </div>
      <p style="margin-top:20px;">This OTP is valid for 10 minutes. If you didn’t request this, please ignore this email.</p>
      <p style="color:#212529;">– Petra ICT Hub Team</p>
    </div>
  </div>
`;

export const passwordResetSuccessTemplate = (name) => `
  <div style="font-family:Poppins, sans-serif; background:#f8f9fa; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #eee;">
      <h2 style="color:#105341;">Password Reset Successful</h2>
      <p>Hi ${name},</p>
      <p>Your password has been reset successfully. If this wasn’t you, please contact support immediately.</p>
      <p style="color:#212529;">– Petra ICT Hub Team</p>
    </div>
  </div>
`;

export const passwordChangedTemplate = (name) => `
  <div style="font-family:Poppins, sans-serif; background:#f8f9fa; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #eee;">
      <h2 style="color:#105341;">Password Changed</h2>
      <p>Hi ${name},</p>
      <p>Your password was changed successfully. If this wasn’t you, please <a href="#">reset it immediately</a>.</p>
      <p style="color:#212529;">– Petra ICT Hub Team</p>
    </div>
  </div>
`;
