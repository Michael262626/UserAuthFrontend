"use client"

import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { forgotPassword } from '@/store/passwordReducer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()  // Using typed dispatch here
  const { toast } = useToast()

  const { isLoading, successMessage, errorMessage } = useAppSelector((state) => state.password)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

  useEffect(() => {
    if (successMessage) {
      const description =
        typeof successMessage === 'string' ? successMessage : successMessage?.message || 'Success'
      toast({ title: 'Success', description })
    }
  
    if (errorMessage) {
      const description =
        typeof errorMessage === 'string' ? errorMessage : errorMessage?.message || 'Something went wrong'
      toast({ title: 'Error', description })
    }
  }, [successMessage, errorMessage, toast])
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <div className="flex items-center">
              <Link href="/" className="mr-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
            </div>
            <CardDescription>
              {isLoading ? 'Sending reset link...' : 'Enter your email to receive a password reset link'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
