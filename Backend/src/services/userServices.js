import prisma from "../config/db.js";

export const createOauthUser =async (newUser, refreshToken) => {
    const insertedUser = await prisma.users.upsert({
        where: { email: newUser.email },
        update: {
            firstname: newUser.firstname,
            lastname: newUser.lastname ?? null,
            oauthRefreshtoken: refreshToken,
            oauthProvider: newUser.oauthProvider,
        },
        
        create: {
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            oauthRefreshtoken: refreshToken,
            oauthProvider: newUser.oauthProvider,
            
        }
    })
    return insertedUser
        
}