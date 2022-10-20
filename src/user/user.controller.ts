import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { createUserDto, UserList } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('v1')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  create(@Body() userDto: createUserDto, @Res() reply) {
    return this.userService.create(userDto).then((user) => {
      reply.send(user);
    });
  }
  @Get('users')
  async findAll() {
    const user = await this.userService.findAll();
    return user;
  }
  @Get('user/:id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(+id);
    return user;
  }
  @Put('user/:id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUser: UserList,
  ) {
    return this.userService.update(id, updateUser).then((UserList) => {
      return UserList;
    });
  }
  @Delete('user/:id')
  remove(@Param('id', new ParseIntPipe()) id: number, @Res() reply) {
    return this.userService.remove(id).then(() => {
      reply.send('user deleted successfully');
    });
  }
}
