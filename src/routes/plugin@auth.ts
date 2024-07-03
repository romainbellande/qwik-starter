import { serverAuth$ } from "@builder.io/qwik-auth";
import Auth0 from "@auth/core/providers/auth0";
import type { Provider } from "@auth/core/providers";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [
      Auth0({
        clientId: env.get("AUTH_CLIENT_ID"),
        clientSecret: env.get("AUTH_CLIENT_SECRET"),
        issuer: env.get("AUTH_ISSUER"),
        authorization: env.get("AUTH_AUTHORIZATION"),
        
      })
    ] as Provider[],
  }));
