import { Module } from '@nestjs/common';
import UserModule from './modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from './configuration/database';

@Module({
  imports: [TypeOrmModule.forRoot(database), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
