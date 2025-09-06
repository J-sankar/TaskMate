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

export const insertRefreshToken = async (refreshToken, userId,deviceId,createdAt) => {
    const hashedToken = await hashPassword(refreshToken)
    const tokenLifetimeMs = 14 * 24 * 60 * 60 * 1000;
    if (!hashedToken) {
        throw new Error("Failed to hash refresh token");
    }
    try {
        const user = await prisma.users.findFirst({
            where: {userId},
            
        })
        if (!user) {
            const error = new Error("user not found")
            error.status = 404
            throw error
        }
        const tokenCount = await prisma.refreshTokens.count({
            where:{ownerId:userId}
        })
        console.log(tokenCount)
        
        if (tokenCount >= 3) {
            const oldestToken = await prisma.refreshTokens.findFirst({
                where:{ownerId:userId},
                orderBy:{createdAt:'asc'}
            })
            await prisma.refreshTokens.delete({
                where:{tokenId:oldestToken.tokenId}
            })
            
        }
        const existingTokens = await prisma.refreshTokens.findMany({
            where:{ownerId:userId, deviceId}
        })
        if (existingTokens.length>0)
            await prisma.refreshTokens.deleteMany({
                where:{ownerId:userId,deviceId}
            })
        
        await prisma.refreshTokens.create({
            data:{
                hashToken:hashedToken,
                deviceId,
                createdAt,
                expiresAt:new Date(createdAt.getTime() + tokenLifetimeMs),
                owner:{connect:{userId}}
            }
        })
        
        
    } catch (error) {
        throw error
    }

}

export const findUserbyEmail = async (email) =>{
    try {
        const user = await prisma.users.findUnique({
            where:{email}
        })
        return user
    } catch (error) {
        throw error
    }
}

export const findUserbyId  = async (userId) =>{
    try {
        const user = await prisma.users.findUnique({
            where:{
                userId
            }
        })
        return user
    } catch (error) {
        throw error
    }
}

