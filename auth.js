import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import {
  credentialsLoginHandler,
  googleSignInHandler,
} from "./app/libs/authenticate";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        // calling the backend api to login with credentials for the access token
        try {
          const userData = await credentialsLoginHandler(
            credentials?.email,
            credentials?.password
          );
          // if all goes right assinged the user
          user = userData;
          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.");
          }
          // return user object with their profile data
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials, session }) {
      if (account.provider === "google") {
        // console.log(profile, "profile----");
        // generating userInfo for registering
        const userInfo = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          profileImage: profile.picture,
        };

        // this handler will return registerd user Info along with the access token
        const currentuser = await googleSignInHandler(userInfo);
        // need to modify the user params to create custom session
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async jwt({ token, user, account, profile }) {
      // modifying the token to modify the session
      if (user) {
        token.name = user.fullName;
        token.role = user.role;
        token.image = user.profileImage;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, user, token }) {
      // modifying the session data
      if (token.name && token.role) {
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});
