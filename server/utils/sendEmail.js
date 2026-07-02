import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.message,
    });
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

export default sendEmail;
