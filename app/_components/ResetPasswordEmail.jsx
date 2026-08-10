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

  console.log(user);

  if (!user) {
    return (
      <AlertDestructive userNoFound="Password reset link is invalid or has already been used 😕." />
    );
  }

  const expiresAt = user.forgotPasswordTokenExpires
    ? new Date(user.forgotPasswordTokenExpires)
    : null;

  console.log(expiresAt);
  if (
    !expiresAt ||
    Number.isNaN(expiresAt.valueOf()) ||
    expiresAt <= new Date()
  ) {
    return (
      <AlertDestructive expiredLink="This reset password link has expired 😕." />
    );
  }

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgotPasswordToken: null,
      },
    });
  }
};

export default ResetPasswordEmail;
