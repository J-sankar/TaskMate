import { describe, it, expect, jest } from '@jest/globals';
import { hashPassword, verifyPassword } from '../../../src/services/passwordServices.js';
import bcrypt from 'bcrypt'

describe("Password Hashing",()=>{
    test("should return hashed password",async ()=>{
        const password = "my life my rules 123"
        const hash = await hashPassword(password)
        expect(hash).toBeDefined()
        expect(password).not.toBe(hash)
        const isValid = await bcrypt.compare(password,hash)
        expect(isValid).toBe(true)
    })
    test("should return error if hashing  failed",async()=>{
        const result = await hashPassword(null)
        expect(result).toBe(false)
    })

})

describe("Password validation",()=>{
    test("Should return true if validation succeeds", async()=>{
        const password = "Story of my life 123"
        const hash = await hashPassword(password)

        const isMatch = await verifyPassword(hash, password)
        expect(isMatch).toBe(true)
    })
    test("should return false if verification failed",async()=>{
        const correct_password = "MyStory124"
        const wrong_password = "falsepassword123"
        const realHash = await hashPassword(correct_password)

        const isMatch = await verifyPassword(realHash, wrong_password)
        expect(isMatch).toBe(false)
        
     })

})