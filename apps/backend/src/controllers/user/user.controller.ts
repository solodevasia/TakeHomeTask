import {
  LoginField,
  QueryUserList,
  UserRegisterField,
} from '@bri/dto/user.dto';
import UserRepository from '@bri/repository/user/user.repository';
import UserService from '@bri/services/user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('user')
export default class UserController {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: UserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  created(@Body() body: UserRegisterField) {
    return this.service.created(body);
  }

  @Post('/login/access')
  @HttpCode(HttpStatus.OK)
  loginAccess(@Body() body: LoginField) {
    return this.service.login(body);
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  profile() {
    return { message: 'works!' };
  }

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
