import { headers } from "next/headers"
import { auth } from "../auth"

export interface IRequireAuthProps {
    allowedRoles: string[]
}

export const permissions = {
    manageUsers: ['admin'],
    teachStudents: ['admin', "teacher"],
    viewChildProgress: ['parent'],
    learn: ['student']
}

export const userInfo = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        throw new Error("Unauthorized")
    }
    return {
        name: session.user.name,
        email: session.user.email,
        id: session.user.id,
        image: session.user.image,
        role: session.user.role,
        phone: session.user.phone,
    }
}

export default async function RequireAuth(props: IRequireAuthProps) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        throw new Error("Unauthorized")
    }
    if (!props.allowedRoles.includes(session.user.role)) {
        throw new Error("Forbidden");
    }
    return session
}
