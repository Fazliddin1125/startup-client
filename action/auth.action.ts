"use server"
import { axiosClient } from '@/http/axios'
import { actionClient } from '@/lib/safe-action'
import { ReturnActionType } from '@/types'
import { loginSchema, registerSchema} from '@/lib/validation'

export const login = actionClient.schema(loginSchema).action<ReturnActionType>(async ({ parsedInput }) => {
	const res = await axiosClient.post('/api/auth/login', parsedInput)
    
	return JSON.parse(JSON.stringify(res.data))
})

export const register = actionClient.schema(registerSchema).action<ReturnActionType>(async({ parsedInput })=>{
	const {data} = await axiosClient.post("/api/auth/register", parsedInput)
	return JSON.parse(JSON.stringify(data))
})



