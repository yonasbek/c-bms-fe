'use server'

import { signIn } from "@/auth"

export async function SignIn(email: string, password: string) {
  return await signIn('credentials', {
    email,
    password,
    redirect: true,
    callbackUrl: "/home",
  })
}