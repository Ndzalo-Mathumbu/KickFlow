import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./data-service";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID_KEY,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    }),
  ],
  events: {
    async signIn(message) {
      await prisma.user.create({
        data: {
          name: message.user.name,
          email: message.user.email,
          avatar: message.user.image,
        },
      });
    },
  },
};
