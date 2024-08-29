import { NextRequest, NextResponse } from "next/server";

// Middleware function to handle session cookies
export function middleware(req: NextRequest) {
  const res = NextResponse.next(); // Create a Next.js response

  const cookie = req.cookies.get("sessionId"); // Retrieve the session cookie

  // If the cookie does not exist, set a new session ID
  if (!cookie) {
    res.cookies.set("sessionId", crypto.randomUUID())
  }

  return res; // Return the response
}
