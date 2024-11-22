import {
  LoginField,
  userRegisterField,
  UserRegisterField,
} from '@bri/dto/user.dto';
import UserEntity from '@bri/entities/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import fs from 'fs';
import { join } from 'path';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async created(body: UserRegisterField) {
    const parse = userRegisterField.safeParse(body);
    if (parse.error) {
      throw new HttpException(
        {
          message: parse.error.errors[0].message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const findOne = await this.repository.findOne({
      where: [{ name: body.name }, { email: body.email }],
    });
    if (findOne) {
      throw new HttpException(
        {
          message: 'Username or email already exists',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    delete body['confirmation'];
    await this.repository.save(this.repository.create(body));
    return { message: 'Account has been created', status: HttpStatus.CREATED };
  }

  async login(body: LoginField) {
    const where = [{ name: body.token }, { email: body.token }];
    const findOne = await this.repository.findOne({ where });
    if (!findOne) {
      throw new HttpException(
        {
          message: 'Username or password inccorect',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!findOne.checkPassword(body.password, findOne.password)) {
      throw new HttpException(
        {
          message: 'Username or password inccorect',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      accessToken: await this.jwtService.signAsync(
        JSON.stringify(
          await this.repository.findOne({
            where,
            select: ['id', 'name', 'email', 'pic', 'role', 'created_at'],
          }),
        ),
        {
          secret: fs.readFileSync(join(__dirname, '../../../jwtRS256.key'), {encoding: 'utf-8'}),
        },
      ),
      status: HttpStatus.OK,
    };
  }
}
