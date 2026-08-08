import  { connectToDatabase } from "./../../../../lib/db";
import   user  from "@/models/user";
import  { NextRequest, NextResponse } from "next/server";

export async function POST(requeest: NextRequest) {
    try {
       const  { email ,password} = await requeest.json();
         if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
         }
    } catch (error)  {
         

    }
}