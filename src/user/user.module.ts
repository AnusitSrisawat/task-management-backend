import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
