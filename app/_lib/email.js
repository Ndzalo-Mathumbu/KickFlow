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

export async function VerifyEmail(userEmail, userName, token) {
  await resend.emails.send({
    from: "KickFlow <onboarding@resend.dev>",
    to: userEmail,
    subject: "Verify your KickFlow account.",
    html: `
      <h1>Welcome ${userName}</h1>
      <p>Thanks for joining KickFlow. Click the following button to verify your email.</p>
     <a
  href="${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}"
  style="
    display:inline-block;
    background:#7c3aed;
    color:white;
    padding:14px 24px;
    text-decoration:none;
    border-radius:8px;
    font-weight:bold;
  "
>
  Verify Email
</a>
    `,
  });
}
