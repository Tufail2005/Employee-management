import { Role } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"



declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            role: Role,
        }&DefaultSession["user"]
    }
    interface User {
    id: string,
    name: string,
    role?: string
}
}



declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        name: string,
        role: Role
    }
}
