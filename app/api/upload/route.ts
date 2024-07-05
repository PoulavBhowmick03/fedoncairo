import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { cid, walletAddress, OrgName, id } = body;

        // Create the Model object
        const newModel = await prisma.model.create({
            data: {
                ipfsAddress: cid,
                organization: {
                    connect: { walletAddress: walletAddress }
                },
                id: cid.toNumber(),
                organizationId: id.toNumber(),
                
            }
        });

        // Add the created Model object to the modelsDeployed array in Organization schema
        const updatedOrganization = await prisma.organization.update({
            where: { walletAddress: walletAddress },
            data: {
                modelsDeployed: {
                    connect: { id: newModel.id }
                }
            }
        });

        return NextResponse.json({ message: 'Model created and added to organization', newModel, updatedOrganization }, { status: 201 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        // Your GET logic here if needed
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
