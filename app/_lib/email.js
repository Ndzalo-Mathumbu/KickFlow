import Link from "next/link";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function WelcomeEmail(userEmail, userName) {
  const { data, error } = await resend.emails.send({
    from: "KickFlow <onboarding@resend.dev>",
    to: userEmail,
    subject: "Welcome to KickFlow 🎉",
    html: `
      <h1>Welcome ${userName}</h1>
      <p>Thanks for joining KickFlow...</p>
    `,
  });
  return { data, error };
}

export async function VerifyEmail(userEmail, userName, token) {
  const { data, error } = await resend.emails.send({
    from: "KickFlow <onboarding@resend.dev>",
    to: userEmail,
    subject: "Verify your KickFlow account",
    html: `
      <h1>Welcome ${userName}</h1>
      <p>Thanks for joining KickFlow. Click the following button to verify your email.</p>
     <a
  href="${process.env.NEXT_PUBLIC_URL}/sign-in?token=${token}&verified=true"
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
  return { data, error };
}

export async function ResetPasswordEmail(userEmail, userName, token, userID) {
  const { data, error } = await resend.emails.send({
    from: "KickFlow <onboarding@resend.dev>",
    to: userEmail,
    subject: "Reset your KickFlow password",
    html: `
      <h1>Welcome ${userName}</h1>
      <p>Here is your password resetting link click the following button to continue.</p>
     <a
  href="${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}&id=${userID}"
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
  Continue
</a>
    `,
  });
  return { data, error };
}
