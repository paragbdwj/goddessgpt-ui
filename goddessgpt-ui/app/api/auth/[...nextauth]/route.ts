import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configure NextAuth to work with Google OAuth
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
  ],
  // Use mock providers for development
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  callbacks: {
    // Include user's name and email in the session
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
});

export { handler as GET, handler as POST }; 