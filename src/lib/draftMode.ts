import {
  type AstroCookies,
  type APIContext,
  type AstroCookieSetOptions,
  type AstroGlobal,
} from 'astro';
import { DRAFT_MODE_COOKIE_NAME } from 'astro:env/client';
import { SIGNED_COOKIE_JWT_SECRET } from 'astro:env/server';
import { PUBLIC_HOSTNAME } from 'astro:env/client';
import { DRAFT_MODE_HOSTNAME } from 'astro:env/server';
import jwt, { type JwtPayload } from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) that is used as a signed cookie for entering
 * Draft Mode.
 */
function jwtToken() {
  return jwt.sign({ enabled: true }, SIGNED_COOKIE_JWT_SECRET);
}

/**
 * To be used on API routes: sets the signed cookie required to enter Draft
 * Mode.
 */
export function enableDraftMode(context: APIContext) {
  context.cookies.set(DRAFT_MODE_COOKIE_NAME, jwtToken(), {
    path: '/',
    sameSite: 'none',
    httpOnly: false,
    secure: true,
    ...({ partitioned: true } as AstroCookieSetOptions),
  });
}

/**
 * To be used on API routes: disables Draft Mode by deleting the cookie.
 */
export function disableDraftMode(context: APIContext) {
  context.cookies.delete(DRAFT_MODE_COOKIE_NAME, {
    path: '/',
    sameSite: 'none',
    httpOnly: false,
    secure: true,
    ...({ partitioned: true } as AstroCookieSetOptions),
  });
}

/**
 * To be used on API routes: checks if Draft Mode is enabled for a given
 * request. It retrieves the cookie and verifies its JWT token.
 */
export function isDraftModeEnabled(contextOrCookies: APIContext | AstroCookies) {
  const cookies = 'cookies' in contextOrCookies ? contextOrCookies.cookies : contextOrCookies;

  const cookie = cookies.get(DRAFT_MODE_COOKIE_NAME);

  if (!cookie) {
    return false;
  }

  try {
    const payload = jwt.verify(cookie.value, SIGNED_COOKIE_JWT_SECRET) as JwtPayload;

    return payload.enabled as boolean;
  } catch (e) {
    return false;
  }
}

/**
 * Returns the HTTP headers needed to enable Draft Mode.
 */
export function draftModeHeaders(): HeadersInit {
  return {
    Cookie: `${DRAFT_MODE_COOKIE_NAME}=${jwtToken()};`,
  };
}



export function baseUrl(requestOrAstro: Request | AstroGlobal) {
 /* const draftMode = isDraftModeEnabled(contextOrCookies);
   return DRAFT_MODE_HOSTNAME === 'localhost'
    ? 'http://localhost:4321'
    : `https://${draftMode ? DRAFT_MODE_HOSTNAME : PUBLIC_HOSTNAME}`;
    */
   return PUBLIC_HOSTNAME;
}
