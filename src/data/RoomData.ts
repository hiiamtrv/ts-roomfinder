export class RoomData {
    ip!: string;
    port!: number;

    constructor(ip: string, port: number) {
        this.ip = ip;
        this.port = port;
    }
}

export const rooms: Map<any, RoomData> = new Map<string, RoomData>();

