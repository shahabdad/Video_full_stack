
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || process.env.NEXT_PUBLIC_PUBLIC_KEY;

        if (!process.env.IMAGEKIT_PRIVATE_KEY || !publicKey) {
            return Response.json({ error: "ImageKit is not configured. Add the public and private API keys to your environment." }, { status: 500 });
        }

        if (!publicKey.startsWith("public_")) {
            return Response.json({ error: "Your ImageKit public key is invalid. Copy the full public key from ImageKit Dashboard → Developer Options → API Keys." }, { status: 500 });
        }

        const authenticationParameters = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey,

        })

        return Response.json({
            authenticationParameters,
            publicKey,
        })
    } catch {
        return Response.json(
            {
                error: "Authentication for  Imagekit failed"
            },
            { status: 500 }
        )
    }
}
