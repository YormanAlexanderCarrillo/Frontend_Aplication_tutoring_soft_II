import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            $ {process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          console.log("data", response.data);

          if (response.data) {
            return response.data;
          } else {
            return null;
          }
        } catch (error) {
          // console.error("Error al autenticar:", error);
          throw new Error("Ocurrio un error verifique las credenciales");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };