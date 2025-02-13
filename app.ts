import {WebSocketServer} from 'ws';
import {closeRoom, handleWsMessage} from "./src/ws_controller";

const wss = new WebSocketServer({port: 8080});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        handleWsMessage(ws, message.toString());
    });

    ws.on("close", (code, reason) => {
        console.log(`Client disconnected. Code: ${code}, Reason: ${reason}`);
        closeRoom(ws)
    });

    ws.on("error", () => {
        closeRoom(ws)
    });

    ws.on("unexpected-response", () => {
        closeRoom(ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');