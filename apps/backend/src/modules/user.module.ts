import UserController from '@bri/controllers/user/user.controller';
import UserEntity from '@bri/entities/user/user.entity';
import UserRepository from '@bri/repository/user/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository],
})
export default class UserModule {}
