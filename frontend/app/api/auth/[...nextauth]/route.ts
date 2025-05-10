import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here if needed
  ],
  // You can add custom pages, callbacks, and other configurations here
  // For example:
  // pages: {
  //   signIn: '/parent-login', // If you want to redirect to your custom login page
  // },
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     if (account && user) {
  //       token.accessToken = account.access_token;
  //       token.id = user.id; // Assuming your user object has an id
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     if (session.user) {
  //        // session.user.id = token.id as string; // Example: Add user id to session
  //     }
  //     // session.accessToken = token.accessToken as string; // Example: Add access token to session
  //     return session;
  //   },
  //   // Potentially, you might want to link OAuth accounts with existing email users
  //   // or create new users in your database here.
  //   // async signIn({ user, account, profile, email, credentials }) {
  //   //   if (account?.provider === "google") {
  //   //     // Check if user exists in your DB, if not create one
  //   //     // const existingUser = await db.user.findUnique({ where: { email: user.email } });
  //   //     // if (!existingUser) {
  //   //     //   await db.user.create({ data: { email: user.email, name: user.name, image: user.image }});
  //   //     // }
  //   //     return true; // Allow sign in
  //   //   }
  //   //   return true; // Do different verification for other providers
  //   // },
  // },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }