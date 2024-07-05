// // pages/api/websocket.ts

// import { NextRequest, NextResponse } from 'next/server';
// import webSocketManager from '../../../lib/websocketManager';

// type RequestBody = {
//   round: number;
//   metrics: Record<string, unknown>;
//   client_ids: string[];
// };

// export async function POST(req: NextRequest) {
//   try {
//     const body: RequestBody = await req.json();
//     console.log('Request body:', body);
//     const { round, metrics, client_ids } = body;
//     console.log('Received round:', round);
//     console.log('Received metrics:', metrics);
//     console.log('Received client IDs:', client_ids);

//     // Broadcast the data to all connected WebSocket clients
//     webSocketManager.broadcast({ round, metrics, client_ids });

//     return NextResponse.json({ message: 'Data received successfully', round, metrics, client_ids });
//   } catch (error) {
//     console.error('Error parsing JSON:', error);
//     return NextResponse.json({ message: 'Invalid JSON received' }, { status: 400 });
//   }
// }


// pages/api/websocket.ts

import { NextRequest, NextResponse } from 'next/server';

let storedValue: string | null = null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { round, metrics, client_ids } = body;
    console.log('Received round:', round);
    console.log('Received metrics:', metrics);
    console.log('Received client IDs:', client_ids);

    // Store the value in a variable
    storedValue = body.client_ids[0];

    return NextResponse.json({ message: 'Data received successfully', round, metrics, client_ids });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ message: 'Invalid JSON received' }, { status: 400 });
  }
}

export async function GET() {
  try {
    // Retrieve the stored value
    if (storedValue !== null) {
      return NextResponse.json({ message: 'Stored value retrieved successfully', value: storedValue });
    } else {
      return NextResponse.json({ message: 'No value stored' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error retrieving value:', error);
    return NextResponse.json({ message: 'Error retrieving value' }, { status: 500 });
  }
}
