import { redirect } from "next/navigation";
import { prisma } from "../_lib/data-service";
import AlertDestructive from "./AlertDestructive";

const ResetPasswordEmail = async function ({ token }) {
  if (!token) {
    return (
      <AlertDestructive invalidLink="This reset password link is invalid 😕." />
    );
  }

  const user = await prisma.user.findFirst({
    where: { forgotPasswordToken: token },
    select: {
      id: true,
      emailVerified: true,
      forgotPasswordTokenExpires: true,
      email: true,
    },
  });

  if (!user) {
    return (
      <h1>
        Password reset link is invalid or has already been used fill in email
        and send new link to your email 😕.
      </h1>
    );
  }

  const expiresAt = user.forgotPasswordTokenExpires
    ? new Date(user.forgotPasswordTokenExpires)
    : null;

  if (
    !expiresAt ||
    Number.isNaN(expiresAt.valueOf()) ||
    expiresAt <= new Date()
  ) {
    return (
      <AlertDestructive expiredLink="This reset password link has expired 😕." />
    );
  }

  if (user.emailVerified) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgotPasswordTokenExpires: null,
      },
    });
  }

  redirect("/reset-password");
};

export default ResetPasswordEmail;
