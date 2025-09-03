import prisma from "../config/db.js";
import { hashPassword, verifyPassword } from "./passwordServices.js";


export const createOauthUser = async (newUser, refreshToken) => {
    try {
        const insertedUser = await prisma.users.upsert({
            where: { email: newUser.email },
            update: {
                firstname: newUser.firstname,
                lastname: newUser.lastname ?? null,
                oauthRefreshtoken: refreshToken,
                oauthProvider: newUser.oauthProvider,
                oauthId:newUser.oauthId,
            },

            create: {
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                oauthRefreshtoken: refreshToken,
                oauthProvider: newUser.oauthProvider,
                oauthId:newUser.oauthId,

            }
        })
        
        return insertedUser
    } catch (error) {
        console.log(error.message)
        throw error

    }

}

export const createUser = async (newUser) => {

    try {

        const hashedPassword = await hashPassword(newUser.password)
       const user = await prisma.users.findUnique({
            where: { email: newUser.email }
        })
        if (user) {
            console.log("Email Exists")

            throw new Error("Email already exists")
        }
        const insertedUser = await prisma.users.create({
            data:{

            firstname: newUser.firstname,
            lastname: newUser.lastname ?? null,
            email: newUser.email,
            password: hashedPassword,
            phoneno: newUser.phoneno ?? null,
        }
        })
        console.log(insertedUser)
        return insertedUser

    } catch (err) {
        throw err

    }
}

export const updateRefreshToken = async (refreshToken, email,deviceId) => {
    const hashedToken = await hashPassword(refreshToken)
    if (!hashedToken) {
        throw new Error("Failed to hash refresh token");


    }
    try {
        const user = await prisma.users.findFirst({
            where: { email },
            select: { refreshtokens: true }
        })
        if (!user) {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }

        const tokens = (user.refreshtokens|| []).filter(t=>t.deviceId !== deviceId) 
        if (tokens.length >= 3) tokens.shift()

        tokens.push({token:hashedToken,deviceId})
        
        await prisma.users.update({
            where: { email },
            data: {
                refreshtokens: tokens
            }
        })
        
    } catch (error) {
        throw error

    }

}

export const findUser = async (email) =>{
    try {
        const user = await prisma.users.findUnique({
            where:{email}
        })
        return user
    } catch (error) {
        throw error
    }
}

