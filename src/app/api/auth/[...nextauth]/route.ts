import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: replace with real Supabase auth once env vars are set
        // Example placeholder — always rejects until wired to Supabase
        if (!credentials?.email || !credentials?.password) return null;

        // Uncomment and fill in once Supabase is configured:
        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email: credentials.email,
        //   password: credentials.password,
        // });
        // if (error || !data.user) return null;
        // return { id: data.user.id, email: data.user.email, role: 'customer' };

        return null; // remove once Supabase is wired
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? 'customer';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
