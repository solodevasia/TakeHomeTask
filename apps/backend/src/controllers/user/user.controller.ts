import { QueryUserList } from '@bri/dto/user.dto';
import UserRepository from '@bri/repository/user/user.repository';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';

@Controller('user')
export default class UserController {
  constructor(private readonly repository: UserRepository) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  list(@Query() query: QueryUserList) {
    return this.repository.find(query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  detail(@Param('id') id: number) {
    return this.repository.findOne(id);
  }
}
