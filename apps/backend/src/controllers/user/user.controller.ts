import AuthGuard from '@bri/decorators/auth-guard';
import {
  LoginField,
  QueryUserList,
  UserRegisterField,
} from '@bri/dto/user.dto';
import UserRepository from '@bri/repository/user/user.repository';
import UserService from '@bri/services/user/user.service';
import { CustomRequest } from '@bri/types/request';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
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
  @UseGuards(AuthGuard)
  profile(@Req() req: CustomRequest) {
    return this.repository.findOne(req.user.id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: number) {
    return this.service.destroy(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  list(@Query() query: QueryUserList) {
    return this.repository.find(query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  detail(@Param('id') id: number) {
    return this.repository.findOne(id);
  }
}
