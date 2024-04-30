import { v4 as uuidv4, validate } from "uuid";
import { IMessage } from "./Message";
import { io } from "./server";
import { Socket } from "socket.io";
import { socket_room_table, socket_user_table } from "./tables";

interface IRoom {
  id?: string;
  ownerId: string;
  createdAt?: number;
  level?: number;
  userLimit?: number;
  title?: string;
  description?: string;
}

export interface IMessage {
  text: string;
  authorId: string;
  userImage: string;
  fullName: string;
}

export interface _IRoom {
  id: string;
  messages: IMessage[];
  roomInfo: {
    ownerId: string;
    roomData: {
      roomName: string;
      roomDescription: string;
      repo: string;
      tags: string[];
      roomLevel: number;
    };
    id: string;
    createdAt: number;
  };
  participatns: Record<
    string,
    {
      authId: string;
      isAdmin: boolean;
      fullName: string;
      imageUrl: string;
      followers: any[];
      following: any[];
      technologies: any[];
      socials: any[];
      createdAt: Date;
      updatedAt: Date;
      id: string;
    }
  >;
}

export class Room {
  static roomList: { [k: string]: _IRoom } = {};
  public id: string;
  public messages = [];
  public roomInfo = {} as _IRoom["roomInfo"];
  public participatns = {};

  constructor(info: _IRoom["roomInfo"]) {
    this.id = uuidv4();
    this.roomInfo = {
      ...info,
      id: this.id,
      createdAt: new Date().getTime(),
    };
    Room.roomList[this.id] = this;
  }

  static getById(roomId: string) {
    return Room.roomList[roomId];
  }

  static getSocketRoom(roomId: string) {
    return io.sockets.adapter.rooms.get(roomId);
  }

  static kickUser(roomId: string, userId: string, socket: Socket) {
    const room = this.getById(roomId);
    if (!room) return { error: "This room doesnt exist" };
    delete room.participatns[userId];
    socket.leave(roomId);
    this.updateStatus(roomId);
  }

  static joinUser(roomId: string, userId: string, user: _IRoom["participatns"][""], socket: Socket) {
    socket_user_table[socket.id] = userId;
    socket_room_table[socket.id] = roomId;
    const room = this.getById(roomId);
    if (!room) return { error: "This room doesnt exist" };
    // room.participatns.push(userId);
    room.participatns[userId] = user;
    socket.join(roomId);
    this.updateStatus(roomId);

    return { data: room };
  }

  static updateStatus(roomId: string) {
    const socketRoom = this.getSocketRoom(roomId);
    const clientsCount = socketRoom?.size || 0;
    const clients = Array.from(socketRoom?.values() || []).map((id) => socket_user_table[id]);
    const room = Room.getById(roomId);
    if (!room) return;
    io.to(roomId).emit("status", {
      count: clientsCount,
      clients: Object.values(room.participatns).map((user) => ({
        id: user.id,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
      })),
    });
  }

  static kickBySocket(socket: Socket) {
    const userId = socket_user_table[socket.id];
    const roomId = socket_room_table[socket.id];
    Room.kickUser(roomId, userId, socket);
    delete socket_user_table[socket.id];
    delete socket_room_table[socket.id];
  }
}
