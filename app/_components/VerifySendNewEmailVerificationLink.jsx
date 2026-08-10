import { redirect } from "next/navigation";
import { prisma } from "../_lib/data-service";
import AlertDestructive from "./AlertDestructive";

const VerifySendNewEmailVerificationLink = async function ({ token }) {
  if (!token) {
    return (
      <AlertDestructive invalidLinkEmailSendNew="This verification link has invalid 😕." />
    );
  }

  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
    select: {
      id: true,
      emailVerified: true,
      verificationTokenExpires: true,
      email: true,
    },
  });

  if (!user) {
    return (
      <AlertDestructive userNoFoundEmailSendNew=" This verification link is invalid or has already been used 😕." />
    );
  }

  const expiresAt = user.verificationTokenExpires
    ? new Date(user.verificationTokenExpires)
    : null;

  if (
    !expiresAt ||
    Number.isNaN(expiresAt.valueOf()) ||
    expiresAt <= new Date()
  ) {
    return (
      <AlertDestructive expiredLinkEmailSendNew="This verification link has expired 😕." />
    );
  }

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken: null,
      },
    });
  }

  /* redirect("/sign-in"); */
};

export default VerifySendNewEmailVerificationLink;
