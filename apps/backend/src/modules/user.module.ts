import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from '@bri/controllers/user/user.controller';
import UserEntity from '@bri/entities/user/user.entity';
import UserRepository from '@bri/repository/user/user.repository';
import UserService from '@bri/services/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [JwtService, UserRepository, UserService],
})
export default class UserModule {}
