import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto, UserList } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userDto: createUserDto) {
    const user = await this.prisma.user.create({ data: userDto });
    return user;
  }
  async findAll() {
    const user = await this.prisma.user.findMany();
    return user;
  }
  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }
  async update(id, updateUser: UserList) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        first_name: updateUser.first_name,
        last_name: updateUser.last_name,
        email: updateUser.email,
      },
    });
    return {
      id: id,
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
    };
  }
  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      return this.prisma.user.delete({ where: { id: id } });
    }
  }
}
