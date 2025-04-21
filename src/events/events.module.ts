// src/events/events.module.ts
import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway], // ถ้าอยาก inject ใน controller
})
export class EventsModule {}
