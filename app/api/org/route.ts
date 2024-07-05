import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, walletAddress } = await req.json();

        if (!name || !walletAddress) {
            return NextResponse.json({ error: 'Name and wallet address are required' }, { status: 400 });
        }

        const newOrg = await prisma.organization.create({
            data: {
                name,
                walletAddress
            }
        });

        return NextResponse.json(newOrg, { status: 201 });
    } catch (error) {
        console.error('Error registering organization:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
export async function GET(req: Request){
  try{
    const orgs = await prisma.organization.findMany();
    return NextResponse.json(orgs, {status: 200});
  }catch(error){
    console.error('Error fetching organizations:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}