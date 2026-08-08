import { redirect } from "next/navigation";
import { prisma } from "../_lib/data-service";

const ResetPasswordEmail = async function ({ token }) {
  if (!token) {
    return <h1>This reset password link is invalid 😕.</h1>;
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
    return <h1>This password reset link has expired 😕.</h1>;
  }

  redirect("/sign-in");
};

export default ResetPasswordEmail;
