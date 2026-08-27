import { connectToDatabase } from "../../../../lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password : "";
      if (!email || !password) {
         return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
      }
      if (password.length < 6) {
         return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
      }

      await connectToDatabase();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
      }

      try {
         await User.create({ email, password });
      } catch (error) {
         if (error && typeof error === "object" && "code" in error && error.code === 11000) {
            return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
         }
         throw error;
      }

      return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
   } catch (error) {
      console.error("Error registering user:", error);
      return NextResponse.json({ error: "Registration is temporarily unavailable. Please try again." }, { status: 500 });
   }
}
