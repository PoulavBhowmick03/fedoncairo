/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

// // next.config.mjs

// import { createServer } from 'http';
// import { parse } from 'url';
// import next from 'next';
// import webSocketManager from './lib/websocketManager.ts';

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   server.on('upgrade', (request, socket, head) => {
//     webSocketManager.wss.handleUpgrade(request, socket, head, (ws) => {
//       webSocketManager.wss.emit('connection', ws, request);
//     });
//   });

//   server.listen(3001, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });

// // export default {
// //   // Your existing Next.js config options here
// // };
