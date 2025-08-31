import { authGoogle,googleCallBack,signup } from "../../../src/controllers/authControllers.js";
import { describe, it, expect, jest } from '@jest/globals';
import { env } from "../../../src/config/env.js";

describe("Testing authControllers",()=>{
    test("should redirect user to google redirect for login",()=>{
        const req= {}
        const res = {
            redirect: jest.fn(),
            
        }
   
        authGoogle(req,res)

        expect(res.redirect).toHaveBeenCalledTimes(1)
        
        const redirecturi = res.redirect.mock.lastCall[0]
        const url = new URL(redirecturi)
        const params = url.searchParams
        expect(params.get("client_id")).toBe(env.CLIENT_ID)
        expect(params.get("redirect_uri")).toBe(env.GOOGLE_CALLBACK_URI)
        expect(params.get("response_type")).toBe("code")
        expect(params.get("access_type")).toBe("offline")
        expect(params.get("scope")).toBe("openid email profile")
        expect(params.get("prompt")).toBe("consent")
    
        
      
        
    })
})