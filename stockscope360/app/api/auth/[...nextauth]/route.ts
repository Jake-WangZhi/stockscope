import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
