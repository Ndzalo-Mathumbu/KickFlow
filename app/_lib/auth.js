import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./data-service";
import { signOut } from "next-auth/react";
import { WelcomeEmail } from "./email";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID_KEY,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
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
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              avatar: user.image,
              welcomeMessage:
                "Welcome to KickFlow 🎉. Thanks for signing up 😀!",
            },
          });
          await WelcomeEmail(newUser.email, newUser.name);

          token.id = newUser.id;
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
