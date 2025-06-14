import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "rahasia_bre";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email dan password wajib diisi." }, { status: 400 });
    }

    const user = await prisma.mst_user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Email tidak ditemukan." }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Password salah." }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Simpan ke cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return NextResponse.json({ message: "Login sukses!", role: user.role }, { status: 200 });
  } catch (err: any) {
    console.error("❌ Error login:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan server.", detail: err.message },
      { status: 500 }
    );
  }
}
