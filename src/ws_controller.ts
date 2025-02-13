import {RoomData, rooms} from "./data/RoomData";

export function handleWsMessage(ws: any, msg: string) {
    try {
        var json = JSON.parse(msg);
        var msgType = json["type"] ?? "ping";
        console.log("msg", json);

        var replyData = {};
        switch (msgType) {
            case "create-room":
                replyData = createRoom(ws, json);
                break;
            case "fetch-room":
                replyData = fetchRoom(json);
                break;
            case "close-room":
                replyData = closeRoom(ws);
                break;
            default:
                replyData = {"data": "pong"};
                break;
        }

        if (!replyData) replyData = {
            type: msgType,
            response: "client fault",
            success: false
        }
        else replyData = {
            type: msgType,
            response: replyData,
            success: true
        }

        ws.send(JSON.stringify(replyData));
    } catch (e) {
        console.error(e);
        ws.close(1, `Unhandled error: ${e}`);
    }
}

function createRoom(ws: any, msgData: any): any {
    var ip = msgData["ip"];
    var port = msgData["port"];

    if (rooms.has(ws)) return null;
    rooms.set(ws, new RoomData(ip, port));
    return "room opened";
}

export function closeRoom(ws: any): any {
    if (!rooms.has(ws)) return null;
    rooms.delete(ws);

    return "room removed";
}

function fetchRoom(msgData: any): any {
    var listRoom = [...rooms.values()];
    console.log("List rooms", listRoom);
    return {
        rooms: listRoom
    };
}
