import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { ipfsLink, orgName, orgWalletAddress } = await req.json();

    if (!ipfsLink || !orgName || !orgWalletAddress) {
      return NextResponse.json({ message: 'IPFS link, organization name, and wallet address are required' }, { status: 400 });
    }

    const organization = await prisma.organization.findUnique({
      where: {
        walletAddress: orgWalletAddress,
      },
    });

    if (!organization) {
      return NextResponse.json({ message: 'Organization not found' }, { status: 404 });
    }

    const newModel = await prisma.model.create({
      data: {
        ipfsAddress: ipfsLink,
        organizationId: organization.id,
      },
    });

    return NextResponse.json(newModel, { status: 201 });
  } catch (error) {
    console.error('Error deploying model:', error);
    return NextResponse.json({ message: 'Error deploying model', error }, { status: 500 });
  }
}