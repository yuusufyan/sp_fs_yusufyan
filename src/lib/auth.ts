// src/lib/auth.ts
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "rahasia_bre"

export async function decodeToken() {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")?.value

  if (!token) return null

  try {
    const user = jwt.verify(token, JWT_SECRET) as {
      id: number
      email: string
      role: string
    }
    return user
  } catch (err) {
    console.error("JWT invalid:", err)
    return null
  }
}
