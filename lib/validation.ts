import { z } from "zod"


export const registerSchema = z.object({
  fullname: z.string().min(3, { message: "Full name must be at least 3 characts" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  phone: z.string().min(13, { message: "Password must be at least 6 characters" })
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const nameSchema = z.object({
  name: z.string().min(2)
})

export const settingSchema = z.object({ kind: z.string() }).merge(nameSchema)

export const updateProductSchema = z
  .object({ id: z.string(), kind: z.string() })
  .merge(nameSchema)

export const priceValidation = z.object({
 
  price: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Faqat musbat son kiriting",
  })

})
export const saleValidation = z.object({
    price: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Faqat musbat son kiriting",
  }),
  benifit: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Faqat musbat son kiriting",
  }).optional(),
  phone: z.string().optional()
})
export const capacitySchema = z.object({
  capacity: z.string().min(2)
})



export const phoneSchema = z.object({
  name: z.string(),
  capacity: z.string(),
  brend: z.string(),
  color: z.string(),
  condition: z.string(),
  new_price: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Faqat musbat son kiriting",
  }),
  price: z.string().regex(/^\d+(\.\d+)?$/, {
    message: "Faqat musbat son kiriting",
  }),
  
})

export const orderSchema = z.object({
  size: z.string(),

})
export const idSchema = z.object({ id: z.string() })
export const kindSchema = z.object({ kind: z.string() }).merge(idSchema)

export const searchParamsSchema = z.object({
		searchQuery: z.string().optional(),
		filter: z.string().optional(),
		brend: z.string().optional(),
    
		// page: z.string().default("1"),
		// pageSize: z.string().default("6"),
	})






export const itemSchema = z.object({
  dress: z.string().min(1, "Dress ID majburiy"),
  size: z.string().min(1, { message: "Size" })
});
