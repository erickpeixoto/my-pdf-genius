"server-only"

import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export const getUserAuth = async () => {
    const user = auth();
    return user;
    }
export const getUser: () => Promise<User | null> = async () => {
    const user = await currentUser();
    return user;
    }