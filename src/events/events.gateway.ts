import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateTaskDto } from 'src/dto/task/createTaskDto.dto';
import { UpdateTaskDto } from 'src/dto/task/updateTaskDto.dto';
import { TaskService } from 'src/task/task.service';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server;

  constructor(
    private readonly taskService: TaskService
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('task:create')
  async handleTaskCreate(client: Socket, payload: CreateTaskDto) {
    const newTask = await this.taskService.create(payload);
    this.server.emit('task:created', newTask); // broadcast ให้ทุกคนเห็น task ที่เพิ่งสร้าง
  }

  @SubscribeMessage('task:update')
  async handleTaskUpdate(client: Socket, payload: { data: UpdateTaskDto }) {
    const updatedTask = await this.taskService.update(payload.data);
    this.server.emit('task:updated', updatedTask); // broadcast ให้ทุกคนเห็น task ที่ถูกอัปเดต
  }
}