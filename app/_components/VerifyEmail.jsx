import { redirect } from "next/navigation";
import { prisma } from "../_lib/data-service";

const VerifyEmail = async function ({ token }) {
  if (!token) {
    return <h1>This verification link is invalid 😕.</h1>;
  }

  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
    select: {
      id: true,
      emailVerified: true,
      verificationTokenExpires: true,
    },
  });

  if (!user) {
    return (
      <h1>This verification link is invalid or has already been used 😕.</h1>
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
    return <h1>This verification link has expired 😕.</h1>;
  }

  if (user.emailVerified !== "TRUE") {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: "TRUE",
        verificationToken: null,
      },
    });
  }

  redirect("/sign-in?verified=1");
};

export default VerifyEmail;
