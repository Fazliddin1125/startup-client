"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader, UserCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { signIn } from 'next-auth/react'
import { login } from "@/action/auth.action"
export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || ""
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
   function onError(message: string) {
    setIsLoading(false)
    toast({ description: message, variant: 'destructive' })
  }
  const handleLogin =async (e: React.FormEvent) => {
    e.preventDefault()
 
    setIsLoading(true)
    const res = await login({email: username, password: password})
    
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return onError('Something went wrong')
    }
    if (res.data.failure) {
      return onError(res.data.failure)
    }
    if (res.data.user) {    

      toast({ description: 'Kirish muvaffaqiyatli bajarildi' })
      signIn('credentials', { userId: res.data.user._id, callbackUrl: `/` })
    }

  }

  const getRoleText = () => {
    if (role === "admin") return "admin"
    if (role === "teacher") return "o'qituvchi"
    if (role === "student") return "o'quvchi"
    return "tizim"
  }

  const getRoleIcon = () => {
    return <UserCircle className="h-12 w-12 text-primary" />
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <Card className="w-full max-w-md shadow-lg border-2">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">{getRoleIcon()}</div>
          <CardTitle className="text-2xl">Kirish</CardTitle>
          <CardDescription className="text-base">
            {getRoleText()} sifatida kirish uchun ma'lumotlaringizni kiriting
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">
                Foydalanuvchi nomi
              </Label>
              <Input
                id="username"
                placeholder="Foydalanuvchi nomingizni kiriting"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base">
                Parol
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Parolingizni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 text-base">
              Kirish
              {isLoading && <Loader className='animate-spin' />}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="mt-8">
        <Button variant="outline" onClick={() => router.push("/")} className="text-base">
          Bosh sahifaga qaytish
        </Button>
      </div>
    </div>
  )
}
