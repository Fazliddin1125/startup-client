
"use server"
import { axiosClient } from "@/http/axios"
import { authOptions } from "@/lib/auth-option"
import { generateToken } from "@/lib/generate-token"
import { actionClient } from "@/lib/safe-action"
import { idSchema, kindSchema, nameSchema, phoneSchema, saleValidation, searchParamsSchema, settingSchema, updateProductSchema } from "@/lib/validation"
import { ReturnActionType } from "@/types"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"



export const getPhones = actionClient.action<ReturnActionType>(async () => {
    const session = await getServerSession(authOptions)
    const token = await generateToken(session?.currentUser?._id)
    const { data } = await axiosClient.get('/api/phone/get-sale', {
        headers: { Authorization: `Bearer ${token}` },
    })
 
    return JSON.parse(JSON.stringify(data))
})


export const getCondition = actionClient.action<ReturnActionType>(async () => {
    const session = await getServerSession(authOptions)
    const token = await generateToken(session?.currentUser?._id)
    const { data } = await axiosClient.get('/api/settings/get/condition', {
        headers: { Authorization: `Bearer ${token}` },
    })
 
    return JSON.parse(JSON.stringify(data))
})

export const getColor = actionClient.action<ReturnActionType>(async () => {
    const session = await getServerSession(authOptions)
    const token = await generateToken(session?.currentUser?._id)
    const { data } = await axiosClient.get('/api/settings/get/color', {
        headers: { Authorization: `Bearer ${token}` },
    })
 
    return JSON.parse(JSON.stringify(data))
})

export const getCapacity = actionClient.action<ReturnActionType>(async () => {
    const session = await getServerSession(authOptions)
    const token = await generateToken(session?.currentUser?._id)
    const { data } = await axiosClient.get('/api/settings/get/capacity', {
        headers: { Authorization: `Bearer ${token}` },
    })
 
    return JSON.parse(JSON.stringify(data))
})

export const getBrend = actionClient.action<ReturnActionType>(async () => {
    const session = await getServerSession(authOptions)
    const token = await generateToken(session?.currentUser?._id)
    const { data } = await axiosClient.get('/api/settings/get/brend', {
        headers: { Authorization: `Bearer ${token}` },
    })
 
    return JSON.parse(JSON.stringify(data))
})

export const createPhone = actionClient.schema(phoneSchema).action<ReturnActionType>(async ({parsedInput}) => {
    const session = await getServerSession(authOptions)
    const token = await generateToken(session?.currentUser?._id)
    const {data} = await axiosClient.post(
        '/api/phone/create', 
        {...parsedInput},
        {headers: { Authorization: `Bearer ${token}` },
    })
    revalidatePath("/phones")
    
    return JSON.parse(JSON.stringify(data))
})

export const editBrend = actionClient.schema(updateProductSchema).action<ReturnActionType>(async({parsedInput})=>{
    const {data} = await axiosClient.put(
        `api/settings/edit/brend/${parsedInput.id}`,
        {...parsedInput}
    )
    revalidatePath("/settings")
    return JSON.parse(JSON.stringify(data))
})

export const editSettings = actionClient.schema(updateProductSchema).action<ReturnActionType>(async({parsedInput})=>{
    const {data} = await axiosClient.put(
        `api/settings/edit/${parsedInput.kind}/${parsedInput.id}`,
        {...parsedInput}
    )
    revalidatePath("/settings")
    return JSON.parse(JSON.stringify(data))
})

export const createSettings = actionClient.schema(settingSchema).action<ReturnActionType>(async({parsedInput})=>{
    const {data} = await axiosClient.post(
        `api/settings/create/${parsedInput.kind}`,
        {...parsedInput}
    )
    revalidatePath("/settings")
    return JSON.parse(JSON.stringify(data))
})
export const deleteAll = actionClient.schema(kindSchema).action<ReturnActionType>(async({parsedInput})=>{
   
    const {data} = await axiosClient.post(
        `api/settings/delete/${parsedInput.kind}/${parsedInput.id}`,
    )    
    revalidatePath("/settings")
    return JSON.parse(JSON.stringify(data))
})


export const getSales = actionClient.action<ReturnActionType>(async()=>{
    const {data} = await axiosClient.get(
        `api/sale/get`
    )
    return JSON.parse(JSON.stringify(data))
})

export const getReport = actionClient.schema(searchParamsSchema).action<ReturnActionType>(async({parsedInput})=>{
    const session = await getServerSession(authOptions)
    const token = await generateToken(session?.currentUser?._id)
    const {data} = await axiosClient.get(
        `api/report/get`,{
            headers: {Authorization: `Bearer ${token}`},
            params: parsedInput
        }
        
    )
    return JSON.parse(JSON.stringify(data))
})
export const createSale = actionClient.schema(saleValidation).action<ReturnActionType>(async({parsedInput})=>{
    
     const {data} = await axiosClient.post(
        `api/sale/create/`,
        {...parsedInput}
    )
    revalidatePath("/phone")
    return JSON.parse(JSON.stringify(data))
})

// export const getMaterial = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/student/get/material', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export async function reHomework(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
//         formData.append('student', userId || "" )
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/student/create/homework', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
       
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 

// export async function createHomework(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
//         formData.append('teacher', userId || "" )
        
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/teacher/create/homework', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
       
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 

// export async function createMaterial(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
//         formData.append('teacher', userId || "" )
        
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/teacher/create/material', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
       
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 

// export const getMyClass = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/teacher/get/class', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export const getTeacherHomework = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/teacher/get/homework', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export const getTeacherMaterial = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/teacher/get/material', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export const getTeacherSubjects = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/teacher/get/subjects', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })




// export async function createClass(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
        
        
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/admin/class/create', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
       
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 

// export async function createSubject(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
        
        
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/admin/subject/create', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
       
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 


// export const getAllClasses = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/admin/class/get', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export const getAllSubjects = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/admin/subject/get', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })
// export const getAllTeachers = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/admin/teacher/get', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })
// export const getAllStudent = actionClient.action<ReturnActionType>(async () => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get('/api/admin/student/get', {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export const getOneClass = actionClient.schema(idSchema).action<ReturnActionType>(async ({parsedInput}) => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get(`/api/admin/class/get/${parsedInput.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     })
//     console.log(data)
//     return JSON.parse(JSON.stringify(data))
// })


// export async function creatStudent(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
        
        
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/admin/student/create', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
       
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 

// export async function createTeacher(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
        
        
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/admin/teacher/create', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
//        console.log(data)
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 

// export async function createClassTeacher(formData: FormData) {
//     try {

//         const session = await getServerSession(authOptions)
//         const token = await generateToken(session?.currentUser?._id)
//         const userId = await session?.currentUser?._id
        
        
//         console.log(formData)
//         const {data} = await axiosClient.post('/api/admin/connect/teacher', formData,
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
       
//         return data
//     } catch (error:any) {
//         console.log(error)
//         return { error: error?.response?.data?.message || 'Server error' }
//     }
// } 

// export const getClassTeacher = actionClient.schema(idSchema).action<ReturnActionType>(async ({parsedInput}) => {
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get(`/api/admin/class/teacher/${parsedInput.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export const getIdHomeworks = actionClient.schema(idSchema).action<ReturnActionType>(async ({parsedInput})=>{
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const { data } = await axiosClient.get(`/api/teacher/get/homework/${parsedInput.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     })
    
//     return JSON.parse(JSON.stringify(data))
// })

// export const getIdClass = actionClient.schema(idSchema).action<ReturnActionType>(async ({parsedInput})=>{
//     const session = await getServerSession(authOptions)
//     const token = await generateToken(session?.currentUser?._id)
//     const res = await axiosClient.get(`/api/teacher/get/class/${parsedInput.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//     })
//     console.log(res)
//     return JSON.parse(JSON.stringify(res.data))
// })