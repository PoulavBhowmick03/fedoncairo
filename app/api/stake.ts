import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, modelId, solStaked } = req.body;

  if (!userId || !modelId || solStaked === undefined) {
    return res.status(400).json({ message: 'User ID, model ID, and SOL staked are required' });
  }

  try {
    const modelTrained = await prisma.modelTrained.create({
      data: {
        userId,
        modelId,
        solStaked,
      },
    });

    // Update the user's total SOL deposited
    await prisma.user.update({
      where: { id: userId },
      data: {
        solDeposited: {
          increment: solStaked,
        },
      },
    });

    res.status(200).json(modelTrained);
  } catch (error) {
    res.status(500).json({ message: 'Error staking SOL for model', error });
  }
}
