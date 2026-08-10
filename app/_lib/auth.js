import GoogleProvider from "next-auth/providers/google";
// import Providers from "next-auth/providers";
import { prisma } from "./data-service";
import { signOut } from "next-auth/react";
import { WelcomeEmail } from "./email";
import Credentials from "next-auth/providers/credentials";
import { ErrorAlert, SuccessAlert } from "../_components/Notifications";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID_KEY,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    }),
    Credentials({
      name: `Credentials`,
      credentials: {
        email: {
          label: `Email`,
          type: `email`,
          placeholder: `johndoe@gamil.com`,
        },
        password: {
          label: `Password`,
          type: `password`,
        },
      },
      async authorize(credentials) {
        const newUser = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            password: true,
            emailVerified: true,
            email: true,
            name: true,
            avatar: true,
          },
        });
        if (!newUser) {
          return null;
        }
        if (newUser) {
          const passwordCheck = await bcrypt.compare(
            credentials.password,
            newUser.password,
          );
          if (!passwordCheck) {
            return null;
          }
          if (passwordCheck) {
            const userEmailVerified = !!newUser.emailVerified;

            if (!userEmailVerified) {
              return null;
            }

            if (userEmailVerified) {
              return newUser;
            }
          }
        }
      },
    }),
  ],
  events: {
    async signIn(message) {
      // CreateUser
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!dbUser) {
          const newUserTwo = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              avatar: user.image,
              welcomeMessage: "Welcome to KickFlow 🎉. Thanks for signing up!",
            },
          });
          await WelcomeEmail(newUserTwo.email, newUserTwo.name);

          token.id = newUserTwo.id;
        } else {
          token.id = dbUser.id;
        }

        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};
