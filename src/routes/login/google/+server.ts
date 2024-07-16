import type { RequestEvent } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { generateCodeVerifier } from "arctic";
import { google } from "~/lib/server/auth/lucia";
import { dev } from "$app/environment";

export async function GET(event: RequestEvent): Promise<Response> {
	const redirectQuery = event.url.searchParams.get("r");

	if (event.locals.user) {
		// already logged in
		const redirectPath = redirectQuery || '/';
		redirect(302, redirectPath)
	};

    const state = JSON.stringify({ r: redirectQuery });
    const codeVerifier = generateCodeVerifier();

	const url = await google.createAuthorizationURL(state, codeVerifier);

	event.cookies.set("google_oauth_state", state, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 10, // 10 min
		sameSite: "lax"
	});

	event.cookies.set("google_oauth_code_verifier", codeVerifier, {
		path: "/",
		secure: !dev,
		httpOnly: true,
		maxAge: 60 * 10, // 10 min
		sameSite: "lax"
	});

	return redirect(302, url.toString());
}
