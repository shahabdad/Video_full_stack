import { authOpations } from  "@/lib/auth";
import  NextAuth from "next-auth/next";
const handler = NextAuth(authOpations);

export { handler as GET, handler as POST }