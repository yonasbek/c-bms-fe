'use server'

import { signIn } from "@/auth"

export async function SignIn(email: string, password: string) {
  await signIn('credentials', {
    email,
    password,
    redirect: true,
    callbackUrl: "/",
  })
}