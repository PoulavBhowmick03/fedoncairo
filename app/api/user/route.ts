import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { walletAddress } = await req.json();
    if (!walletAddress) {
      return NextResponse.json(
        { message: "Wallet address is required" },
        { status: 400 }
      );
    }
    const newUser = await prisma.user.create({
      data: {
        walletAddress,
        solDeposited: 0,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error: error },
      { status: 500 }
    );
  }
}
