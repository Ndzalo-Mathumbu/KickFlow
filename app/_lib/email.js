import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function WelcomeEmail(userEmail, userName) {
  await resend.emails.send({
    from: "KickFlow <onboarding@resend.dev>",
    to: userEmail,
    subject: "Welcome to KickFlow 🎉",
    html: `
      <h1>Welcome ${userName}</h1>
      <p>Thanks for joining KickFlow...</p>
    `,
  });
}
